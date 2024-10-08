const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { where } = require('sequelize');
const fs = require('fs');
try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

const upload = multer({
    // AWS에 저장
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'react-nodebird-s3',
        key(req, file, cb) {
            cb(null, `original/${Date.new()}_${path.basename(file.originalname)}`);
        },
    }),

    //     // 하드디스크에 저장(임시로 현재 컴퓨터에 저장)
    // storage: multer.diskStorage({
    //     destination(req, file, done) {
    //         done(null, 'uploads');
    //     },
    //     filename(req, file, done) {
    //         // 노드에서는 기본적으로 중복된 파일명은 덮어쓴다.
    //         // 동일한 파일명이 덮어씌워지는 것을 방지하기 위해 아래와 같은 작업을 진행한다.
    //         // path는 노드의 코어 모듈이다.
    //         const ext = path.extname(file.originalname); // 확장자 추출
    //         const basename = path.basename(file.originalname, ext); // 확장자를 제외한 파일명 추출
    //         done(null, basename + '_' + new Date().getTime() + ext); // 이름과 확장자 사이에 업로드된 시간을 추가
    //     },
    // }),
    limits: { files: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((tag) => Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }))
            );
            await post.addHashtags(result.map((v) => v[0]));
        }
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                // [image1.png, image2.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            } else {
                // image1.png
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, attributes: ['id', 'nickname'] },
                { model: User, as: 'Likers', attributes: ['id'] },
            ],
        });
        return res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
    // res.json(req.files.map((v) => v.filename));
});
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        console.log();
        const comment = await Comment.create({
            content: req.body.content,
            PostId: +req.params.postId,
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{ model: User, attributes: ['id', 'nickname'] }],
        });
        return res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: Post,
                    as: 'Retweet',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model: User,
                    as: 'Likers',
                    attributes: ['id', 'nickname'],
                },
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                        },
                    ],
                },
            ],
        });
        console.log('fullpost', fullPost);
        return res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [
                {
                    model: Post,
                    as: 'Retweet',
                },
            ],
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('자신의 글을 리트윗할 수 없습니다.');
        }
        const retweetTargetId = post.RetweedId || post.id;
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }

        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });
        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [
                {
                    model: Post,
                    as: 'Retweet',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                        },
                    ],
                },
            ],
        });
        return res.status(201).json(retweetWithPrevPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// router.delete('/', (req, res) => {
//     res.json({ id: 1 });
// });

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.patch('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.update({ content: req.body.content }, { where: { id: req.params.postId, UserId: req.user.id } });
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((tag) => Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }))
            );
            await post.addHashtags(result.map((v) => v[0]));
        }
        res.status(200).json({ PostId: +req.params.postId, content: req.body.content });
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: { id: req.params.postId, UserId: req.user.id },
        });
        res.status(200).json({ PostId: +req.params.postId });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;

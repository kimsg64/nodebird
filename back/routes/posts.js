const express = require('express');
const { Op } = require('sequelize');
const { Post, Image, User, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        if (+req.query.lastId) {
            where.id = { [Op.lt]: +req.query.lastId };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }] },
            ],
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/related', async (req, res, next) => {
    try {
        const followings = await User.findAll({
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'Followers',
                    where: { id: req.user.id },
                },
            ],
        });
        const where = {
            UserId: { [Op.in]: followings.map((v) => v.id) },
        };
        if (+req.query.lastId) {
            where.id = { [Op.lt]: +req.query.lastId };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }] },
            ],
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/unrelated', async (req, res, next) => {
    try {
        const followings = await User.findAll({
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'Followers',
                    where: { id: req.user.id },
                },
            ],
        });
        const where = {
            UserId: { [Op.notIn]: followings.map((v) => v.id) },
        };
        if (+req.query.lastId) {
            where.id = { [Op.lt]: +req.query.lastId };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }] },
            ],
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;

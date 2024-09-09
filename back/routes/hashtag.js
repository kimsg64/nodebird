const express = require('express');
const { User, Post, Hashtag } = require('../models');
const { where } = require('sequelize');
const router = express.Router();

router.get('/:hashtag', async (req, res, next) => {
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
                { model: Hashtag, where: { name: decodeURIComponent(req.params.hashtag) } },
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

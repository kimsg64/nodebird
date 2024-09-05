const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { where } = require('sequelize');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const user = await User.findOne({ where: { id: req.user.id } });
            console.log('check if there is the user', user);
            // 사용자가 있는 경우
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: { exclude: ['password'] },
                include: [
                    { model: Post, attributes: ['id'] },
                    { model: User, as: 'Followings', attributes: ['id'] },
                    { model: User, as: 'Followers', attributes: ['id'] },
                ],
            });
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            // 사용자가 없는 경우
            return res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (serverError, user, clientError) => {
        if (serverError) {
            console.error(serverError);
            next(serverError);
        }
        if (clientError) {
            return res.status(401).send(clientError.reason);
        }
        return req.login(user, async (loginError) => {
            if (loginError) {
                // passport의 login error
                console.error(loginError);
                return next(loginError);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: { exclude: ['password'] },
                include: [{ model: Post }, { model: User, as: 'Followings' }, { model: User, as: 'Followers' }],
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
    // POST /user/
    const { email, nickname, password } = req.body;

    try {
        const exUser = await User.findOne({
            where: { email },
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            nickname,
            password: hashedPassword,
        });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    console.log('logoutme', req.user);
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
    req.session.destroy();
    res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({ nickname: req.body.nickname }, { where: { id: req.user.id } });
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            return res.status(403).send('it is ghost');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: +req.params.userId });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            return res.status(403).send('it is ghost');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: +req.params.userId });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(403).send('it is ghost');
        }
        const followers = await user.getFollowers(req.user.id);
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(403).send('it is ghost');
        }
        const followings = await user.getFollowings(req.user.id);
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(403).send('it is ghost');
        }
        await user.removeFollowers(req.params.userId);
        res.status(200).json({ UserId: +req.params.userId });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

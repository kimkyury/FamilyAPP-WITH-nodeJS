const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (exUser) { // 아이디 이미 존재
            return res.status(403).json({
                errorCode: 1,
                message: '이미 존재하는 아이디입니다.'
            });
        }
        await db.User.create({
            email: req.body.email,
            password: hash,
            nickname: req.body.nickname,
            color: req.body.color,
            birth: req.body.birth,
            category: req.body.category,
        });

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err) => {
                try {
                    if (err) {
                        console.error(err);
                        return next(err);
                    }
                    const fullUser = await db.User.findOne({
                        where: { email: user.email },
                        attributes: ['id', 'email', 'nickname'],
                    });
                    return res.json(fullUser);
                } catch (err) {
                    console.error(err);
                    return next(err);
                }
            });
        })(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }

})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    attributes: ['id', 'email', 'nickname'],
                });
                console.log('full', fullUser);
                return res.json(fullUser);
            });
        })(req, res, next);
    } catch (err) {
        console.error(err);
    }
})

router.post('/logout', isLoggedIn, async (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('로그아웃');
    }
})

module.exports = router;
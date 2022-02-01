const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/:tag', isLoggedIn, async (req, res, next) => {
    try {
        const mainPosts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
            }, {
                model: db.Image,
            }, {
                model: db.User,
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: db.Comment,
            }]
        });
        return res.json(mainPosts);
    } catch (err) {
        console.error(err);
        return next(err);
    }

});

module.exports = router;
const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const mainPosts = await db.Post.findAll({
            include: [{
                model: db.User,
            }, {
                model: db.Image,
            }, {
                model: db.Folder,
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: db.Comment,
                include: [{
                    model: db.User,
                    attributes: ['id', 'category', 'nickname']
                }]
            }]
        });
        return res.json(mainPosts);
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;
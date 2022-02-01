const express = require('express');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1310650",
    key: "cbcc2529e3c4bed987f0",
    secret: "47c93faee31409b628c9",
    cluster: "ap3",
    useTLS: true,
});

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const userId = await db.User.findOne({
            where: { id: parseInt(req.body.userId) }
        })
        const message = await db.Chat.create({
            message: req.body.message,
            UserId: userId.id,
        });
        const fullMessage = await db.Chat.findOne({
            where: { id: message.id },
            include: [{
                model: db.User,
            }]
        });
        await pusher.trigger("chat", "message", {
            id: fullMessage.id,
            message: fullMessage.message,
            User: fullMessage.User,
        });
        return res.json('ok');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
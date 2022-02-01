const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const mainChats = await db.Chat.findAll({
            include: [{
                model: db.User,
            }]
        });
        return res.json(mainChats);
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;
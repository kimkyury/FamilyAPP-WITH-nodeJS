const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const mainSpecials = await db.Special.findAll({
            include: [{
                model: db.User,
            }]
        });
        return res.json(mainSpecials);
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;
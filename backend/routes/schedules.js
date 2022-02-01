const express = require('express');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const schedules = await db.Schedule.findAll({
            include: [{
                model: db.User,
            }]
        });
        return res.json(schedules);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;
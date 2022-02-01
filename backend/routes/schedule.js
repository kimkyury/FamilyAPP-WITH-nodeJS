const express = require('express');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const newSchedule = await db.Schedule.create({
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            UserId: req.user.id,
        });
        const fullSchedule = await db.Schedule.findOne({
            where: { id: newSchedule.id },
            include: [{
                model: db.User,
            }]
        });
        return res.json(fullSchedule);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        await db.Schedule.destroy({
            where: { id: req.params.id }
        });
        res.send('성공');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;
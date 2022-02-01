const express = require('express');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        console.log('ok');
        const special = await db.Special.create({
            content: req.body.content,
            date: req.body.date,
            UserId: req.body.id,
        });
        const fullSpeicial = await db.Special.findOne({
            where: { id: special.id },
            include: [{
                model: db.User,
            }]
        })
        return res.json(fullSpeicial);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        await db.Special.destroy({
            where: { id: req.params.id }
        })
        return res.send('성공');
    } catch (err) {
        console.error(err);
        return next(err);
    }
})

module.exports = router;
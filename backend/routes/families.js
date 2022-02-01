const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const families = await db.User.findAll({

        });
        res.json(families);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;
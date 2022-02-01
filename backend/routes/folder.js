const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const folders = await db.Folder.findAll({});
        return res.json(folders);
    } catch (err) {
        console.error(err);
    }

});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.Folder.destroy({
            where: { id: req.params.id }
        });
        return res.send('성공');
    } catch (err) {
        console.error(err);
    }

});

router.put('/change', async (req, res, next) => {
    try {
        const date = await db.Folder.findOrCreate({
            where: { date: req.body.date },
        });
        await db.Post.update({
            FolderId: date[0].id,
        }, {
            where: { id: req.body.id }
        });
        const fullPost = await db.Post.findOne({
            where: { id: req.body.id },
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
            }],
        });
        res.json(fullPost);

        return res.send('성공');
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;
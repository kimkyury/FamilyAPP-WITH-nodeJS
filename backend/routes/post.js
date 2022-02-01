const express = require('express');
const path = require('path');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + Date.now() + ext);
        },
    }),
    limit: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
    return res.json(req.files.map(v => v.filename));
});

router.post('/mainImage', upload.single('image'), async (req, res) => {
    await db.MainImage.destroy({
        where: {}
    });
    const src = await db.MainImage.create({
        src: req.file.filename,
    })
    return res.send(src);
});

router.get('/mainImage', async (req, res) => {
    const mainImage = await db.MainImage.findOne({

    })
    return res.send(mainImage);
})

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if (!req.body.image) return res.status(401).send('사진이없음');
        const newDate = await db.Folder.findOrCreate({
            where: { date: req.body.date },
        });
        const image = await db.Image.create({ src: req.body.image });
        const newPost = await db.Post.create({
            FolderId: newDate[0].id,
            content: hashtags && hashtags.reduce((a, b) => a + ' ' + b) || '',
            UserId: req.user.id,
            ImageId: image.id,
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            })));
            await newPost.addHashtags(result.map(r => r[0]));
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
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

        return res.json(fullPost);
    } catch (err) {
        console.error(er);
        next(err);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        await db.Post.destroy({
            where: { id: req.params.id }
        })
        return res.send('성공');
    } catch (err) {
        console.error(err);
        return next(err);
    }
})

router.post('/like/:id', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.delete('/like/:id', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (err) {
        console.error(err);
        return next(err);
    }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        const comment = await db.Comment.findOne({
            where: { id: newComment.id },
            include: [{
                model: db.User,
            },],
        });
        return res.json(comment);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get('/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하니 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            include: [{
                model: db.User,
            }],
            order: [['createdAt', 'ASC']],
        })
        res.json(comments);
    } catch (err) {
        console.error(err);
        return next(err);
    }
})

module.exports = router;
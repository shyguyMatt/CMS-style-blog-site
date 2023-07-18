const router = require('express').Router();
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('recentposts', {posts});
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/test', (req, res) => {
    res.json('homeroutes test success!');
});

module.exports = router;

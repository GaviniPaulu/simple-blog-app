const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import your Post model

// GET all posts (Index Page)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'desc' }); // Fetch all posts, newest first
        res.render('index', { posts }); // Render the index.ejs template
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading posts.');
    }
});

// GET form to create new post (New Page)
router.get('/new', (req, res) => {
    res.render('new'); // Render the new.ejs template
});

// POST a new post
router.post('/', async (req, res) => {
    const { title, author, content } = req.body;
    const post = new Post({ title, author, content });
    try {
        await post.save();
        res.redirect('/posts'); // Redirect to the list of all posts
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating post.');
    }
});

// GET a single post by ID (Show Page)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found.');
        }
        res.render('show', { post }); // Render a 'show.ejs' template (you'll create this soon)
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching post.');
    }
});

// GET form to edit an existing post (Edit Page)
router.get('/:id/edit', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found for editing.');
        }
        res.render('edit', { post }); // Render an 'edit.ejs' template (you'll create this soon)
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form.');
    }
});

// PUT/PATCH update an existing post
router.put('/:id', async (req, res) => {
    try {
        const { title, author, content } = req.body;
        await Post.findByIdAndUpdate(req.params.id, { title, author, content });
        res.redirect(`/posts/${req.params.id}`); // Redirect to the updated post's page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating post.');
    }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts'); // Redirect to the list of all posts
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting post.');
    }
});


module.exports = router;
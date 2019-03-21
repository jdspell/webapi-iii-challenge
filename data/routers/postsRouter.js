const express = require('express');

const Posts = require('../helpers/postDb.js');

const postsRouters = express.Router();


postsRouters.get('/', async (req, res) => {
    try{
        const posts = await Posts.get();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve the posts." })
    }
});

postsRouters.post('/', async (req, res) => {
    try {
        const newPost = await Posts.insert(req.body);
        res.status(200).json(newPost);

    } catch (error) {
        res.status(500).json({ message: "Unable to create post." });
    }
});

postsRouters.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: "Unable to delete post." });
    }
});

postsRouters.put('/:id', async (req, res) => {
    try {
        console.log(req.params.id, req.body);
        const count = await Posts.update(req.params.id, req.body);
        res.status(200).json(count);

    } catch (error) {
        res.status(500).json({ message: "Unable to update post." })
    }
})


module.exports = postsRouters;
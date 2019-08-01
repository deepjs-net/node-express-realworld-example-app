
const express = require('express');

const user = require('../controllers/user');
const post = require('../controllers/post');

const router = express.Router();

// 博文
router.get('/', post.index)
router.get('/posts', post.index)
router.get('/post/create', post.create)
router.get('/post/:id', post.find)
router.post('/post/:id/edit', post.update)

// 用户


module.exports = router;

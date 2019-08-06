
const express = require('express');

const user = require('./api/user');
const topic = require('./api/topic');

const router = express.Router();

// 文章
router.get('/topics', topic.getAll)
router.post('/topic/create', topic.create)
router.post('/topic/:id/edit', topic.updateTopicById)
router.get('/topic/:id', topic.getTopicById)

// 用户
router.get('/useres', user.getAll)
router.post('/user/create', user.create)
router.post('/user/:id/edit', user.updateUserById)
router.get('/user/:id', user.getUserById)

module.exports = router;

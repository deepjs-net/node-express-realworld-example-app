
const express = require('express');

const user = require('./api/user');
const topic = require('./api/topic');

const router = express.Router();

// 博文
router.get('/topics', topic.getTopics)
router.post('/topic/create', topic.create)
router.post('/topic/:id/edit', topic.updateTopicById)
router.get('/topic/:id', topic.getTopicById)

module.exports = router;

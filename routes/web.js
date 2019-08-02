
const express = require('express');

const user = require('../controllers/user');
const topic = require('../controllers/topic');
const user = require('../controllers/user');

const router = express.Router();

// 博文
router.get('/', topic.index)
router.get('/topic/create', topic.create)
router.post('/topic/:id/edit', topic.update)
router.get('/topic/:id', topic.find)
router.get('/topic', topic.index)

// 用户
router.get('/', user.index)
router.get('/user/create', user.create)
router.get('/user/:id', user.find)
router.get('/user', user.index)

module.exports = router;


const express = require('express');

const auth = require('./middleware/auth');

const topic = require('./controller/topic');
const user = require('./controller/user');
const sign = require('./controller/sign');

const router = express.Router();

// 博文
router.get('/', topic.index)
router.get('/topic/create', topic.create)
router.post('/topic/:id/edit', topic.update)
router.get('/topic/:id', topic.find)
router.get('/topic', topic.index)

// 登录
router.get('/login', sign.index)
router.post('/login', sign.login)
router.get('/logout', sign.logout)

// 用户
router.get('/user/:name', user.test)
// router.get('/user/:id', user.find)
router.get('/user', user.index)


// github oauth
// router.get('/auth/github', auth.github, passport.authenticate('github'))

module.exports = router;

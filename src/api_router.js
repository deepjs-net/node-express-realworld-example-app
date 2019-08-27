import express from 'express'

import auth from './common/auth'
import user from './api/user'
import topic from './api/topic'
import comment from './api/comment'

const router = express.Router()

// 参数统一使用 `query` 传递，不使用 `param`

// 用户 auth.required,
router.post('/user/create', user.create)
router.post('/user/login', user.login)
router.post('/user/logout', user.logout)
router.get('/user/list', user.getList)
// router.get('/user/info', auth.required, user.getOne)
router.get('/user/info', user.getOne)
// router.get('/user/profile', user.getOne)
// router.get('/user/authinfo', auth.required, user.getOne)
router.put('/user/update', auth.required, user.update)
router.delete('/user/delete', auth.required, user.delete)

// 文章
router.get('/topic/list', topic.getList)
router.get('/topic/feed', auth.required, topic.getList)
router.get('/topic/info', topic.common, topic.getOne)
router.get('/topic/rawinfo', auth.required, topic.common, topic.getRawOne)
router.post('/topic/create', auth.required, topic.create)
router.put('/topic/update', auth.required, topic.common, topic.update)
router.delete('/topic/delete', auth.required, topic.common, topic.delete)

// 评论
router.get('/comment/list', comment.getList)
router.get('/comment/info', comment.common, comment.getOne)
router.get('/comment/rawinfo', auth.required, comment.common, comment.getRawOne)
router.post('/comment/create', auth.required, comment.create)
// router.put('/comment/update', auth.required, comment.common, comment.update)
router.delete('/comment/delete', auth.required, comment.common, comment.delete)

router.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message

        return errors
      }, {}),
    })
  }

  return next(err)
})

export default router


import express from 'express'

import auth from './common/auth'
import topic from './api/topic'
import user from './api/user'

const router = express.Router();

// 用户 auth.required,
router.post('/user/create', user.create)
router.post('/user/login', user.login)
router.post('/user/logout', user.logout)
router.get('/user/list', user.getUserList)
router.get('/user/info', user.getUserInfo)
// router.get('/user', auth.required, user.getUserInfo)
router.put('/user/update', auth.required, user.updateUserInfo)
router.delete('/user/delete', auth.required, user.deleteUser)
// router.delete('/user', auth.required, user.delete)

// router.get('/user/:username', user.getUserByName)


// 文章
// router.get('/topics', topic.getAll)
// router.post('/topic/create', topic.create)
// router.post('/topic/:id/edit', topic.updateTopicById)
// router.get('/topic/:id', topic.getTopicById)


router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(400).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});


export default router;

// import { body, oneOf, validationResult } from 'express-validator/check'
// https://github.com/luffyZh/express-react-scaffold/blob/master/server/routes/user.js
import passport from '../common/passport'
import { User } from '../model'
import { isUnDef, compactObject, filterObject } from '../utils'

export default {
  getOne(req, res, next) {
    const {
      id,
      username,
      email,
    } = req.body

    if (id) {
      User.findById(id).then(data => {
        if (!data || data.deleted) return res.sendStatus(404)

        res.json({
          data: data.toAuthJSON(),
          // errno: 0, // 默认即成功
          // errmsg: 'success',
          logid: '',
          timestamp: Date.now(),
        })
      })
    } else {
      const query = {}
      if (username) query.username = username
      if (email) query.email = email

      User.findOne(query).then(data => {
        if (!data || data.deleted) return res.sendStatus(404)
        res.json({
          data: data.toAuthJSON(),
          // errno: 0, // 默认即成功
          // errmsg: 'success',
          logid: '',
          timestamp: Date.now(),
        })
      })
    }
  },
  getList(req, res, next) {
    // 允许的查询条件
    const { username, email } = req.body
    const query = {}
    if (username) query.username = username
    if (email) query.email = email
    User.find(query).then(data => {
      if (!data) return res.sendStatus(404)
      res.json({
        data: {
          list: data.filter(item => {
            if (item.deleted) return false
            return item.toJSON()
          }),
          total: data.length,
        },
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },
  create(req, res, next) {
    // nodejs 接收post 请求数据
    // https://segmentfault.com/q/1010000003043380
    // https://blog.csdn.net/HaoDaWang/article/details/53024122
    // https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html
    const {
      username,
      email,
      password,
    } = req.body

    const user = new User()

    user.email = email
    user.username = username
    user.setPassword(password)

    user.save().then(() => {
      // express中 res.json( )和 res.send( )
      // https://blog.csdn.net/starter_____/article/details/79068894
      return res.json({
        data: {
          user: user.toAuthJSON()
        },
      })
    }).catch(err => {
      // console.log(err)
      next(err)
    })
  },
  login(req, res, next) {
    const { email, password } = req.body

    if (!email) {
      return res.status(422).json({
        data: {
          email: `can't be blank`
        },
      })
    }
    if (!password) {
      return res.status(422).json({
        data: {
          password: `can't be blank`
        },
      })
    }

    passport.authenticate('local', {session: false}, function (err, user, info) {
      if (err) return next(err)

      if (user) {
        if (user.deleted) return res.sendStatus(404)

        user.token = user.generateJWT()
        return res.json({
          data: user.toAuthJSON()
        })
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  },
  logout(req, res, next) {
    // 采用 token 认证，退出登录实现
    // - 纯前端实现，删除 localStorage 中的 token 即可
    // - 服务端实现，重置或清空 token（此 token 会保存在缓存或数据库中）
    const { id } = req.body
    return res.json({
      code: 1,
      codeText: '可以纯前端实现',
    })
    // req.session.destroy(function(err) {
    //   // cannot access session here
    //   console.log(err)
    //   return res.json({
    //     data: {
    //       code: 1,
    //       codeText: '注销登录成功',
    //     },
    //   })
    // })
  },

  update(req, res, next) {
    const {
      id,
      password,
      ...rest
    } = req.body
    const { payload } = req

    if (!id) return res.send({
      error: `user id is necessary`
    })

    // console.log(req.payload)
    if (payload.id !== id) return res.sendStatus(401)

    User.findById(id).then(data => {
      if (!data) return res.sendStatus(401)
      if (data.deleted) return res.sendStatus(404)

      // only update fields that were actually passed...
      // 接受修改的字段 filter
      // 这里做过滤，无效的删除，非白名单的删除
      const whiteList = ['username', 'email', 'bio', 'avatar']
      const securityData = filterObject(rest, whiteList)
      Object.assign(data, compactObject(rest, [undefined]))
      if (isUnDef(password)) {
        data.setPassword(password)
      }

      return data.save().then(function(){
        return res.json({
          data: data.toAuthJSON()
        })
      })
    }).catch(next)
  },
  delete(req, res, next) {
    const { id } = req.body

    if (!id) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    User.findById(id).then(data => {
      if (!data || data.deleted) return res.sendStatus(404)

      data.deleted = true

      return data.save().then(function(){
        return res.json({
          errno: 0,
          errmsg: '删除成功',
          data: {
            id: data.toJSON(),
          },
        })
      })
    })
  },
}

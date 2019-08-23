// import { body, oneOf, validationResult } from 'express-validator/check'
// https://github.com/luffyZh/express-react-scaffold/blob/master/server/routes/user.js
import passport from '../common/passport'
import { User } from '../model'
import { isUnDef, compactObject, filterObject } from '../utils'
import { pageLimitDefault } from './config'

export default {
  // 新建用户
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
          user: user.toAuthJSON(true)
        },
      })
    }).catch(next)
  },

  // 登录
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

    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) return next(err)

      if (user) {
        user.token = user.generateJWT()
        return res.json({
          data: user.toAuthJSON(true),
        })
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  },

  // 注销登录
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

  // 返回用户列表
  getList(req, res, next) {
    // 允许的查询条件
    const { username, email } = req.body
    let {
      pageNum = 1,
      pageLimit = pageLimitDefault,
    } = req.body

    pageNum = Number(pageNum)
    pageLimit = Number(pageLimit)

    const query = { }
    if (username) query.username = username
    if (email) query.email = email
    const offset = (pageNum - 1) * pageLimit

    // https://mongoosejs.com/docs/queries.html
    Promise.all([
      User.find(query)
        // .where('deleted').equals(true) // 使用 mongoose-delete
        .limit(pageLimit)
        .skip(offset)
        .exec(),
      User.countDocuments(query)
    ]).then(([data, count]) => {
      res.json({
        data: {
          list: data.map(item => item.toAuthJSON()),
          total_count: count,
          page_num: pageNum,
          page_limit: pageLimit,
          total_page: Math.ceil(count / pageLimit),
          // has_more: Math.ceil(count / pageLimit) > pageNum,
        },
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    }).catch(next)
  },

  // 返回用户信息
  getOne(req, res, next) {
    const {
      id,
      username,
      email,
    } = req.body
    // req.body 默认为 {}, req.payload 默认为 undefined
    const authId = req.payload && req.payload.id

    function getone() {
      if (id) {
        return User.findById(id)
      } else {
        const query = {}
        if (username) query.username = username
        if (email) query.email = email
        return User.findOne(query)
      }
    }

    getone().then(data => {
      if (!data) return res.sendStatus(404)

      res.json({
        // TODO: 这里不应该得到 token(只在 login以及更新用户信息后 返回)，而是返回用户基本信息
        // 判断是否包含非公开信息
        // data: authId === data.id ? data.toProfileJSON() : data.toPublicJSON(),
        data: data.toAuthJSON(authId === data.id),
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },

  // 更新用户信息
  update(req, res, next) {
    const { id, password, ...rest } = req.body
    const authId = req.payload && req.payload.id

    if (!id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    if (authId !== id) return res.sendStatus(401)

    User.findById(id).then(data => {
      if (!data) return res.sendStatus(401)
      // if (data.deleted) return res.sendStatus(404)

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

  // 删除用户
  delete(req, res, next) {
    // 必先校验用户
    const userId = req.body.id
    const authId = req.payload && req.payload.id

    if (!userId) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    // 校验 auth 权限
    if (authId !== userId) return res.sendStatus(401)
    User.findById(authId).then(data => {
      if (!data) return res.sendStatus(404)

      // deleteById
      return data.delete(authId).then(function(){
        return res.json({
          data: data.toPublicJSON(),
          errno: 0,
          errmsg: '删除成功',
        })
      })
    })
  },
}

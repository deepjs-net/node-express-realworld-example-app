import passport from '../common/passport'
import { User } from '../model'
import { isUnDef, compactObject } from '../utils'

function getNum() {
  return Date.now() % 100000000;
}

export default {
  create(req, res, next) {
    const {
      username,
      email,
      password,
    } = req.body;

    const user = new User()

    user.email = email
    user.username = username
    user.setPassword(password)

    user.save().then(() => {
      // express中 res.json( )和 res.send( )
      // https://blog.csdn.net/starter_____/article/details/79068894
      return res.json({
        user: user.toAuthJSON()
      })
    }).catch(err => {
      // console.log(err)
      next(err)
    });
  },
  login(req, res, next) {
    const {
      email,
      password,
    } = req.body

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
        user.token = user.generateJWT();
        return res.json({
          data: user.toAuthJSON()
        })
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  },
  logout(req, res, next) {
    // 退出登录可以前端删除 localStorage 中的 token 实现
    // 本接口实现在服务端删除用户登录状态，删除 session
    const {
      id,
    } = req.body
    req.session.destroy(function(err) {
      // cannot access session here
      console.log(err)
      return res.json({
        data: {
          code: 1,
          codeText: '注销登录成功',
        },
      })
    })
  },
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
    User.find().then(data => {
      if (!data) return res.sendStatus(404)
      res.json({
        data: {
          list: data.filter(item => {
            if (item.deleted) return false
            return item.toJSON()
          }),
        },
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },
  update(req, res, next) {
    const {
      id,
      password,
      ...rest
    } = req.body

    if (!id) return res.send({
      error: `user id is necessary`
    })

    User.findById(id).then(data => {
      if (!data) return res.sendStatus(404)

      // only update fields that were actually passed...
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
    const {
      id,
    } = req.body

    if (!id) return res.send({
      error: `user id is necessary`
    })

    User.findById(id).then(data => {
      if (!data || data.deleted) return res.sendStatus(404)

      data.deleted = true

      return data.save().then(function(){
        return res.json({
          data: {
            code: 1,
            codeText: '删除成功',
          },
        })
      })
    })
  },
}

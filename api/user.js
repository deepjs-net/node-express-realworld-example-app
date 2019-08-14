import passport from '../common/passport'
import { User } from '../model'

function getNum() {
  return Date.now() % 100000000;
}

export default {
  signup(req, res, next) {
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
      username,
      password,
    } = req.body

    if (!username) {
      return res.status(422).json({
        data: {
          username: `can't be blank`
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
  getUserById(req, res, next) {
    const {
      id,
    } = req.body

    User.findById(id).then(data => {
      // express中 res.json( )和 res.send( )
      // https://blog.csdn.net/starter_____/article/details/79068894
      res.json({
        data,
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },

  // getUserByName(req, res, next) {
  //   const {
  //     username,
  //   } = req.body;

  //   model.findOne({ username })
  //     .then(function (data) {
  //       res.send({
  //         data,
  //       })
  //     })
  // },
  // create(req, res, next) {
  //   const {
  //     user_id,
  //     username,
  //     password,
  //   } = req.body;

  //   const info = {
  //     user_id,
  //     username: `${username}${getNum()}`,
  //     password: `Hd@9${password}2*#1`,
  //   }
  //   model.create(info)
  //     .then(function (data) {
  //       res.send({
  //         meta: data,
  //         data: '创建用户成功'
  //       })
  //     })
  // },
  // getAll(req, res, next) {
  //   model.findAll()
  //     .then(function (data) {
  //       res.send(data)
  //     })
  // },
  // getUserById(req, res, next) {
  //   const {
  //     id,
  //   } = req.body;

  //   model.findOne({ user_id: id })
  //     .then(function (data) {
  //       res.send({
  //         data,
  //       })
  //     })
  // },
  // updateUserById(req, res, next) {
  //   const {
  //     userId: user_id,
  //     // ...rest,
  //   } = req.body;

  //   model.findOne({ user_id }, req.body)
  //     .then(function (data) {
  //       res.send({
  //         data,
  //       })
  //     })
  // },

}

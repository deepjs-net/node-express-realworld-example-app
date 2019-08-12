import { userModel as model } from '../model'

function getNum() {
  return Date.now() % 100000000;
}

export default {
  create(req, res, next) {
    const {
      user_id,
      username,
      password,
    } = req.body;

    const info = {
      user_id,
      username: `${username}${getNum()}`,
      password: `Hd@9${password}2*#1`,
    }
    model.create(info)
      .then(function (data) {
        res.send({
          meta: data,
          data: '创建用户成功'
        })
      })
  },
  getAll(req, res, next) {
    model.findAll()
      .then(function (data) {
        res.send(data)
      })
  },
  getUserById(req, res, next) {
    const {
      id,
    } = req.body;

    model.findOne({ user_id: id })
      .then(function (data) {
        res.send({
          data,
        })
      })
  },
  updateUserById(req, res, next) {
    const {
      userId: user_id,
      // ...rest,
    } = req.body;

    model.findOne({ user_id }, req.body)
      .then(function (data) {
        res.send({
          data,
        })
      })
  },
  getUserByName(req, res, next) {
    const {
      username,
    } = req.body;

    model.findOne({ username })
      .then(function (data) {
        res.send({
          data,
        })
      })
  },
}

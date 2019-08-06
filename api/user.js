const model = require('../model').userModel;

function getNum() {
  return Date.now() % 100000000;
}

module.exports = {
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
    model.getAll()
      .then(function (data) {
        res.send(data)
      })
  },
  getUserById(req, res, next) {

  },
  updateUserById(req, res, next) {

  },
  getUserByName(req, res, next) {


  },
}

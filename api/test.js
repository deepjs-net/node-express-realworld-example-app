import { User } from '../model';

function getNum() {
  return Date.now() % 100000000;
}

export default {
  findAll(req, res, next) {
    console.log(req.body);
    User.findAll(req.body)
      .then(function (data) {
        res.send(data)
      })
  },
  findOne(req, res, next) {
    const { user_id, username } = req.body;
    const query = {};
    if (user_id) {
      query.user_id = user_id
    }
    if (username) {
      query.username = username
    }
    User.findOne(query)
      .then(function (data) {
        res.send(data)
      })
  },
  // findById(req, res, next) {
  //   const { id } = req.body;
  //   User.findOne({ _id: id })
  //     .then(function (data) {
  //       res.send(data)
  //     })
  // },
  create(req, res, next) {
    // nodejs 接收post 请求数据
    // https://segmentfault.com/q/1010000003043380
    // https://blog.csdn.net/HaoDaWang/article/details/53024122
    // https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html

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
    User.create(info)
      .then(function (data) {
        res.send({
          meta: data,
          data: '添加成功'
        })
      })
  },
  update(req, res, next) {
    User.create(req.body)
      .then(function (data) {
        res.send({
          meta: data,
          data: '添加成功'
        })
      })
  },
  delete(req, res, next) {
    const { user_id } = req.body;
    User.delete({user_id}, {deleted: true})
      .then(function (data) {
        res.send({
          meta: data,
          data: '删除成功'
        })
      })
  },
}

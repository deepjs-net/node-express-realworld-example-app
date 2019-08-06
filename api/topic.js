const model = require('../model').topicModel;

module.exports = {
  getTopics: (req, res, next) => {
    const author = req.query.author
    model.getTopics(author)
      .then(function (data) {
        res.send(data)
      })
  },
  create: (req, res, next) => {
    // nodejs 接收post 请求数据
    // https://segmentfault.com/q/1010000003043380
    // https://blog.csdn.net/HaoDaWang/article/details/53024122
    // https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html

    const {
      title,
      content,
    } = req.body;

    const info = {
      title,
      content,
    }
    model.create(info)
      .then(function (data) {
        res.send({
          meta: data,
          data: '添加文章成功'
        })
      })
  },
  updateTopicById: (req, res, next) => {
    res.send({
      hello: new Date().toJSON(),
    })
  },
  getTopicById: (req, res, next) => {
    res.send({
      hello: new Date().toJSON(),
    })
  },
}

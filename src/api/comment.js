import { Comment, Topic, User } from '../model'

// import { pageLimitDefault } from './config'

export default {
  // 公共方法
  common(req, res, next) {
    const { id } = req.body
    // const authId = req.payload && req.payload.id

    Comment.findById(id).populate('author')
      .then(data => {
        if (!data) return res.sendStatus(404)

        req.comment = data

        return next()
      }).catch(next)
  },

  create(req, res, next) {
    const authId = req.payload && req.payload.id
    const { topicId, ...rest } = req.body

    if (!authId) return res.sendStatus(401)

    // 用户必须登录，文章必须存在
    Promise.all([
      User.findById(authId),
      Topic.findById(topicId),
    ]).then(([user, topic]) => {
      // 这样比router.param 路由通过 next 之后调用更快
      if (!user) return res.sendStatus(401)
      if (!topic) return res.sendStatus(404)

      const comment = new Comment(rest)
      comment.author = user
      comment.topic = topic

      comment.save().then(() => {
        topic.comments.push(comment)

        topic.save().then(data => {
          return res.json({
            data: comment.toJSONFor(user),
          })
        })
      })
    }).catch(next)
  },

  // 返回列表
  getList(req, res, next) {
    // 允许的查询条件
    const authId = req.payload && req.payload.id
    const { topicId } = req.body

    // let {
    //   pageNum = 1,
    //   pageLimit = pageLimitDefault,
    // } = req.body

    // pageNum = Number(pageNum)
    // pageLimit = Number(pageLimit)
    // const offset = (pageNum - 1) * pageLimit

    Promise.all([
      authId ? User.findById(authId) : null,
      Topic.findById(topicId)
        // .limit(pageLimit) // 此处只是 comments 字段，所以分页需要特殊处理
        // .skip(offset)
        // .sort({createdAt: 'desc'})
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
          },
          options: {
            sort: {
              createdAt: 'desc',
            },
          },
        }),
      Topic.findById(topicId),
    ]).then(([user, topic, count]) => {
      console.log(topic)
      console.log(count)
      res.json({
        data: {
          list: topic.comments.map(item => item.toJSONFor(user)),
          total_count: topic.comments.length,
        },
        errno: 0,
        errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    }).catch(next)
  },

  getRawOne(req, res, next) {
    const query = req.body
    const authId = req.payload && req.payload.id

    if (!query.id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    // 填充用户信息
    Promise.all([
      req.payload ? User.findById(authId) : null,
      // execPopulate 填充多个不同的查询
      // https://codeday.me/bug/20171114/96273.html
      req.comment.populate('author').execPopulate(),
    ]).then(([ user ]) => {
      return res.json({
        data: req.comment.toJSONFor(user),
      })
    }).catch(next)
  },

  // 返回格式化内容
  getOne(req, res, next) {
    const authId = req.payload && req.payload.id

    // 填充用户信息
    Promise.all([
      req.payload ? User.findById(authId) : null,
      req.comment.populate('author').execPopulate(),
    ]).then(([ user ]) => {
      return res.json({
        data: req.comment.toJSONFor(user),
      })
    }).catch(next)
  },

  delete(req, res, next) {
    // 必先校验用户，后直接删除，不用软删除？
    const commentId = req.body.id
    const authId = req.payload && req.payload.id

    if (!commentId) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      // 统一处理后，直接 req.comment 上取
      if (req.comment.author._id.toString() !== authId) {
        return res.sendStatus(403)
      }

      return req.comment.delete(authId).then(() => {
        return res.sendStatus(204)
      })
    }).catch(next)
  },
}

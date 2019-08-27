import { Topic, User } from '../model'
import { filterObject } from '../utils'
import { pageLimitDefault } from './config'

export default {
  // 公共方法
  common(req, res, next) {
    // 要支持 slug 搜索，这个再 url 表现上体验更好
    const { id, ...rest } = req.body
    // const authId = req.payload && req.payload.id

    function getone() {
      if (id) {
        return Topic.findById(id)
      } else {
        return Topic.findOne(rest)
      }
    }

    getone().populate('author')
      .then(data => {
        if (!data) return res.sendStatus(404)

        req.topic = data

        return next()
      }).catch(next)
  },

  // 创建一篇文章
  create(req, res, next) {
    const authId = req.payload && req.payload.id

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      const data = new Topic(req.body)
      data.author = user

      return data.save().then(() => {
        return res.json({
          data: data.toJSONFor(user),
        })
      })
    }).catch(next)
  },

  // 返回文章列表
  getList(req, res, next) {
    // 允许的查询条件
    const query = {}
    const { author } = req.body
    const authId = req.payload && req.payload.id

    Promise.all([
      author ? User.findOne(author) : null,
    ]).then(([user]) => {
      if (user) query.author = user._id
      let {
        pageNum = 1,
        pageLimit = pageLimitDefault,
      } = req.body

      pageNum = Number(pageNum)
      pageLimit = Number(pageLimit)
      const offset = (pageNum - 1) * pageLimit

      Promise.all([
        Topic.find(query)
          .limit(pageLimit)
          .skip(offset)
          .sort({createdAt: 'desc'})
          .populate('author')
          .exec(),
        Topic.countDocuments(query).exec(),
        authId ? User.findById(authId) : null,
      ]).then(([data, count, authUser]) => {
        res.json({
          data: {
            list: data.map(item => item.toJSONFor(authUser)),
            total_count: count,
            page_num: pageNum,
            page_limit: pageLimit,
            total_page: Math.ceil(count / pageLimit),
            // has_more: Math.ceil(count / pageLimit) > pageNum,
          },
          errno: 0,
          errmsg: 'success',
          logid: '',
          timestamp: Date.now(),
        })
      }).catch(next)

    })
  },

  // 返回订阅列表
  getFeed(req, res, next) {
    let {
      pageNum = 1,
      pageLimit = pageLimitDefault,
    } = req.body
    const authId = req.payload && req.payload.id

    pageNum = Number(pageNum)
    pageLimit = Number(pageLimit)

    const offset = (pageNum - 1) * pageLimit

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      const query = {
        // author: { $in: user.following }
      }
      // https://mongoosejs.com/docs/queries.html
      Promise.all([
        Topic.find(query)
          .limit(pageLimit)
          .skip(offset)
          .populate('author')
          .exec(),
        User.countDocuments(query)
      ]).then(([data, count]) => {
        res.json({
          data: {
            list: data.map(item => item.toJSONFor(user)),
            total_count: count,
            page_num: pageNum,
            page_limit: pageLimit,
            total_page: Math.ceil(count / pageLimit),
            // has_more: Math.ceil(count / pageLimit) > pageNum,
          },
          errno: 0,
          errmsg: 'success',
          logid: '',
          timestamp: Date.now(),
        })
      }).catch(next)
    })
  },

  // 返回原始内容
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
      // TODO: 这里不必须吧
      req.topic.populate('author').execPopulate(),
    ]).then(([ user ]) => {
      return res.json({
        data: req.topic.toJSONFor(user),
      })
    }).catch(next)
  },

  // 返回格式化内容
  getOne(req, res, next) {
    const authId = req.payload && req.payload.id

    // 填充用户信息
    Promise.all([
      req.payload ? User.findById(authId) : null,
      req.topic.populate('author').execPopulate(),
    ]).then(([ user ]) => {
      return res.json({
        data: req.topic.toJSONFor(user),
      })
    }).catch(next)
  },

  // 更新文章
  update(req, res, next) {
    const { id: topicId, ...rest } = req.body
    const authId = req.payload && req.payload.id
    const { topic } = req

    if (!topicId) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    // if (payload.id !== id) return res.sendStatus(401)
    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      // 统一处理文章，结果挂载到 req.topic 上
      if (topic.author._id.toString() !== authId) {
        return res.sendStatus(403)
      }

      // only update fields that were actually passed...
      Object.assign(topic, filterObject(rest, ['title', 'desc', 'body']))

      return topic.save().then((newTopic) => {
        return res.json({
          data: newTopic.toJSONFor(user),
        })
      }).catch(next)
    })
  },

  // 删除文章
  delete(req, res, next) {
    // 必先校验用户
    const topicId = req.body.id
    const authId = req.payload && req.payload.id

    if (!topicId) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      // 统一处理后，直接 req.topic 上取
      if (req.topic.author._id.toString() !== authId) {
        return res.sendStatus(403)
      }

      return req.topic.delete(authId).then(() => {
        return res.sendStatus(204)
      })
    }).catch(next)
  },
}

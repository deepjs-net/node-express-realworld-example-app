import { Topic, User } from '../model'
import { isUnDef, compactObject, filterObject } from '../utils'

export default {
  common(req, res, next, slug) {
    Topic.findOne({ slug })
      // .populate('author')
      .then(data => {
        if (!data) return res.sendStatus(404)

        req.topic = data
      }).catch(next)
  },
  create(req, res, next) {
    const authId = req.payload.id

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      const data = new Topic(req.body)
      data.author_id = user.id

      return data.save().then(() => {
        return res.json({
          data: data.toJSONFor(user),
        })
      })
    }).catch(next)
  },
  getRawOne(req, res, next) {
    const { id } = req.body
    if (!id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    Topic.findById(id).then(data => {
      if (!data || data.deleted) return res.sendStatus(404)

      res.json({
        data,
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },
  getOne(req, res, next) {
    const { id } = req.body
    if (!id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    Topic.findById(id).then(data => {
      if (!data || data.deleted) return res.sendStatus(404)

      res.json({
        data,
        // errno: 0, // 默认即成功
        // errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    })
  },
  getList(req, res, next) {
    // 允许的查询条件
    const { title, tag } = req.body
    const query = {}
    if (title) query.title = title
    if (tag) query.tag = tag
    Topic.find(query).then(data => {
      if (!data) return res.sendStatus(404)
      res.json({
        data: {
          list: data.filter(item => {
            if (item.deleted) return false
            return item
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
    const { id, ...rest } = req.body

    if (!id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    // console.log(req.payload)
    // if (payload.id !== id) return res.sendStatus(401)

    Topic.findById(id).then(data => {
      if (!data) return res.sendStatus(401)
      if (data.deleted) return res.sendStatus(404)

      // only update fields that were actually passed...
      Object.assign(data, compactObject(rest, [undefined]))

      return data.save().then(function(){
        return res.json({
          data,
        })
      })
    }).catch(next)
  },
  delete(req, res, next) {
    // 必先校验用户
    const topicId = req.body.id
    const authId = req.payload.id

    if (!topicId) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    User.findById(authId).then(user => {
      if (!user) return res.sendStatus(401)

      // 统一处理文章，结果挂载到 req.topic 上
      if (req.topic.authorId.toString() !== authId) {
        return res.sendStatus(403)
      }

      return req.topic.delete(authId).then(() => {
        return res.sendStatus(204)
      })
    })
  },
}

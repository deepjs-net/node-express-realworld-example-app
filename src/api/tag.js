import { Tag, User, Topic } from '../model'

export default {
  async create(req, res, next) {
    const authId = req.payload && req.payload.id
    const { topicId, ...rest } = req.body

    if (!authId) return res.sendStatus(401)
    Promise.all([
      User.findById(authId),
      Topic.findById(topicId),
    ]).then(([user, topic]) => {
      if (!user) return res.sendStatus(401)

      const tag = new Tag(rest)
      tag.author = user
      topic && tag.topics.push(topic)

      tag.save().then(async () => {

        if (topic) {
          topic.tags.push(tag)
          await topic.save()
        }
        return res.json({
          data: tag.toJSONFor(user),
        })
      })

    }).catch(next)
  },
  getList(req, res, next) {
    const query = {}
    Promise.all([
      Tag.find(query).exec(),
      Tag.countDocuments(query)
    ]).then(([data, count]) => {
      res.json({
        data: {
          list: data.map(item => item.toJSONFor()),
          total_count: count,
        },
        errno: 0,
        errmsg: 'success',
        logid: '',
        timestamp: Date.now(),
      })
    }).catch(next)
  },
  getOne(req, res, next) {
    const tagId = req.body.id
    Promise.all([
      Tag.findById(tagId).exec(),
    ]).then(([tag]) => {
      if (!tag) return res.sendStatus(404)

      return res.json({
        data: tag.toJSONFor(),
      })
    }).catch(next)
  },
  update(req, res, next) {
    // 必须是管理员权限或自己的标签才可以修改，暂只判定自己的标签才可以改
    const { id: tagId, name } = req.body
    const authId = req.payload && req.payload.id

    Promise.all([
      Tag.findById(tagId).exec(),
      User.findById(authId).exec(),
    ]).then(([tag, user]) => {
      if (!user) return res.sendStatus(401)
      if (!tag) return res.sendStatus(404)

      console.log(tag)
      // if (tag.author._id.toString() !== authId) {
      if (tag.author !== authId) {
        return res.sendStatus(403)
      }
      if (name && tag.name !== name) {
        tag.name = name
        tag.save().then(() => {
          return res.json({
            data: tag.toJSONFor(),
          })
        })
      } else {
        // 未修改
        return res.json({
          errno: 304,
          errmsg: '未修改',
        })
      }
    }).catch(next)
  },
  delete(req, res, next) {
    // 必先校验用户，后直接删除，不用软删除？
    const tagId = req.body.id
    const authId = req.payload && req.payload.id

    if (!tagId) return res.send({
      errno: 404100,
      errmsg: `data id is necessary`,
    })

    Promise.all([
      Tag.findById(tagId).exec(),
      User.findById(authId).exec(),
    ]).then(([tag, user]) => {
      if (!user) return res.sendStatus(401)
      if (!tag) return res.sendStatus(404)

      if (tag.author._id.toString() !== authId) {
        return res.sendStatus(403)
      }

      return tag.remove().then(() => {
        return res.sendStatus(204)
      })
    }).catch(next)
  },
}

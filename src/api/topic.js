import { Topic } from '../model'
import { isUnDef, compactObject } from '../utils'


export default {
  create(req, res, next) {
    const {
      title,
      desc,
      content,
    } = req.body

    const data = new Topic()

    data.save().then(() => {
      // express中 res.json( )和 res.send( )
      // https://blog.csdn.net/starter_____/article/details/79068894
      return res.json({
        data,
      })
    }).catch(err => {
      // console.log(err)
      next(err)
    })
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
    const { id } = req.body

    if (!id) return res.send({
      errno: 404100,
      errmsg: `query params id is necessary`,
    })

    Topic.findById(id).then(data => {
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

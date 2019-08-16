import { testModel as model } from '../model'

export default {
  test: (req, res, next) => {
    res.render('index', {
      data: 'hello',
    })
  },
  index: (req, res, next) => {
    console.log(req.body)
    model.findAll(req.body).then(function(data) {
      console.log(data)
      res.render('index', {
        code: 0,
        data: {
          list: data,
        },
      })
    })
  },
  create: (req, res, next) => {},
  update: (req, res, next) => {},
  find: (req, res, next) => {
    const { user_id, username } = req.body
    const query = {}
    if (user_id) {
      query.user_id = user_id
    }
    if (username) {
      query.username = username
    }
    model.findOne(query).then(function(data) {
      res.send(data)
    })
  },
  // posts: async function(){
  //   return await db.post.find({}).exec();
  // }
  // post: async function(id){
  //   return await db.post.findOne({id: id}).exec();
  // }
}

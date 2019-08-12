import api from '../api'

export default {
  test: (req, res, next) => {
    res.render('index', {
      data: 'hello',
    });
  },
  index: (req, res, next) => {
    api.topic.getAll({})
    res.render('index', {
      data: 'hello',
    });
  },
  create: (req, res, next) => {},
  update: (req, res, next) => {},
  find: (req, res, next) => {},
  // posts: async function(){
  //   return await db.post.find({}).exec();
  // }
  // post: async function(id){
  //   return await db.post.findOne({id: id}).exec();
  // }
}


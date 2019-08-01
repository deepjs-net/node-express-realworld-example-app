const db = require('../db')

module.exports = {
  index: (req, res, next) => {
    res.render('index', {
      data: 'hello',
    });
    next();
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


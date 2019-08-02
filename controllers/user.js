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
  // users: async function(){
  //   return await db.user.find({}).exec();
  // },
  // user: async function(id){
  //   return await db.user.findOne({id: id}).exec();
  // }
}

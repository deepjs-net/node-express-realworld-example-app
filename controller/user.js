import api from '../api'

export default {
  test: (req, res, next) => {
    console.log(req.params)
    res.send('hello, ' + req.params.name)
  },
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

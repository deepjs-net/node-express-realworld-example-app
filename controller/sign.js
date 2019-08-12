import api from '../api'
import config from '../config'

export default {
  test: (req, res, next) => {
    res.render('index', {
      data: 'hello',
    });
  },
  index: (req, res, next) => {
    res.render('login', {});
  },
  login: (req, res, next) => {
    console.log('\n\n\n 111111 \n\n\n');
    console.log(req);
    console.log('\n\n\n 111111 \n\n\n');
  },
  // GET logout
  logout: (req, res, next) => {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    req.flash('success', '登出成功')
    res.redirect('/');
  },
  // posts: async function(){
  //   return await db.post.find({}).exec();
  // }
  // post: async function(id){
  //   return await db.post.findOne({id: id}).exec();
  // }
}

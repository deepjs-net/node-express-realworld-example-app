
import passport from 'passport'
// import LocalStrategy from 'passport-local'
import { User } from '../model'

import { Strategy } from 'passport-local'

// https://www.npmjs.com/package/passport
// https://www.npmjs.com/package/passport-local
// https://github.com/passport/express-4.x-local-example/blob/master/server.js
passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({ email }).then(user => {
      console.log(user)
      if (!user || !user.verifyPassword(password)) {
        return done(null, false, {
          errors: {'email or password': 'is invalid'}
        })
      }
      return done(null, user)
    }).catch(done)
  }
))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user, done) {
  done(null, user.id)
})


// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    if (err) return done(err)
    done(err, user)
  })
})

export default passport

import path from 'path'
import express from 'express'
import session from 'express-session'
// import ConnectStore from 'connect-mongo'
import cors from 'cors'
// import flash from 'connect-flash'
import bodyParser from 'body-parser'
// import winston from 'winston'
// import expressWinston from 'express-winston'
import errorhandler from 'errorhandler'

import config from './config'
import './db';
import logger from './common/logger'
import passport from './common/passport';
import apiRouter from './api_router'
import webRouter from './web_router'

const app = express();
const argument = process.argv;
// const MongoStore = ConnectStore(session);

app.proxy = true
// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')))

// 模板目录
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 设置模板全局常量
app.locals._layoutFile = 'layout.html';
app.locals.blog = {
  title: config.title,
  keywords: config.keywords,
  description: config.description,
}

// 处理请求数据
// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  // store: new MongoStore({ // 将 session 存储到 mongodb
  //   url: config.mongodb,   // mongodb 地址
  // })
}))
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(passport.initialize());
app.use(passport.session());

// router 放在 错误请求日志之前 成功日志之后
app.use('/api', cors(), apiRouter);
app.use('/', webRouter);
// app.use(function (err, req, res, next) {
//   debugger;
//   console.log(11111111);
//   console.log(res);
//   next()
// })

// error handler
if (config.debug) {
  app.use(errorhandler());
  app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
        error: err,
      }
    })
  })
} else {
  app.use(function (err, req, res, next) {
    logger.error(err)
    // req.flash('error', err.message)
    // res.status(err.status || 500);
    // res.json({
    //   errors: {
    //     message: err.message,
    //     error: {}
    //   }
    // });
    return res.status(500).send('500 status')
  })
}

const ip = '127.0.0.1'

// const env = argument[2] || 'dev';
if(module.parent){
  // 被 require，则导出 app
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(process.env.PORT || config.port, () => {
    console.log(`\n start programme ${ip}:${config.port} \n`);
  })
}

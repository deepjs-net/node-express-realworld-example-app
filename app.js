import path from 'path'
import express from 'express'
import session from 'express-session'
import ConnectStore from 'connect-mongo'
import cors from 'cors'
import flash from 'connect-flash'
import bodyParser from 'body-parser'
import winston from 'winston'
import expressWinston from 'express-winston'
// import errorhandler from 'errorhandler'

import config from './config'
import logger from './common/logger'
import apiRouter from './api_router'
import webRouter from './web_router'
// const db = require('./db');
// const ip = require('ip').address();

const app = express();
const argument = process.argv;
const MongoStore = ConnectStore(session);

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
  description: config.description
}

// 处理请求数据
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: config.mongodb,   // mongodb 地址
  })
}))

// flash 中间件，用来显示通知
app.use(flash())

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  // res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

// router 放在 错误请求日志之前 成功日志之后
app.use('/api', cors(), apiRouter);
app.use('/', webRouter);

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

// error handler
// if (config.debug) {
//   app.use(errorhandler());
// } else {
  app.use(function (err, req, res, next) {
    logger.error(err);
    req.flash('error', err.message)
    return res.status(500).send('500 status');
  });
// }

const ip = '127.0.0.1'

// const env = argument[2] || 'dev';
if(module.parent){
  // 被 require，则导出 app
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, ()=>{
    console.log(`start programme ${ip}:${config.port} \n`);
  })
}

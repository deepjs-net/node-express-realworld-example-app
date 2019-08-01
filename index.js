const path = require('path');
const express = require('express');
const cors = require('cors');

const config = require('./config');
const logger = require('./common/logger');
const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');
// const db = require('./db');
// const ip = require('ip').address();
const app = express();
const argument = process.argv;

// 静态资源目录
app.use(express.static(path.join(__dirname, 'assets')))

// 模板目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 设置模板全局常量
app.locals._layoutFile = 'layout.html';
// 设置模板全局常量
app.locals.blog = {
  title: config.title,
  keywords: config.keywords,
  description: config.description
}

// routes
app.use('/api', cors(), apiRouter);
app.use('/', webRouter);

app.use(function (err, req, res, next) {
  logger.error(err);
  return res.status(500).send('500 status');
});

const ip = '127.0.0.1'

const env = argument[2] || 'dev';
// 抛出或启动监听
if(module.parent){
  module.exports = app;
}else{
  app.listen(config[env].port, ()=>{
    console.log(`start programme ${ip}:${config[env].port} \n`);
  })
}

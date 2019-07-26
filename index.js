const path = require('path');
const express = require('express');
const routes = require('./routes');
const config = require('./config');
// const mongo = require('./mongodb');
const ip = require('ip').address();
const app = express();
const argument = process.argv;

// 模板目录
app.set('views', path.join(__dirname, 'views'));
// 静态资源目录
app.use(express.static(path.join(__dirname, 'assets')))

// 路由
routes(app);

const env = argument[2] || 'dev';
// 抛出或启动监听
if(module.parent){
  module.exports = app;
}else{
  app.listen(config[env].port, ()=>{
    console.log(`start programme ${ip}${config[env].port}`);
  })
}

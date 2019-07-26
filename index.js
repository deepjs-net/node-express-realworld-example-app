const path = require('path');
const express = require('express');
const routes = require('./routes');
const config = require('./configs');
const app = express();

// 模板目录
app.use('views', path.join(__dirname, 'views'));
// 静态资源目录
app.use(express.static(path.join(__dirname, 'assets')))

// 路由
routes(app);

// 抛出或启动监听
if(module.parent){
  module.exports = app;
}else{
  app.listen()
}

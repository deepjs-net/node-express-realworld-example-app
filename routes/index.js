module.exports = function(app) {
  app.get('/', (rerq, rers)=>{

  })
  // 不同的状态页面，如404，500
  // 文章列表
  // 单个文章
  app.use('/article', require('./articles'));
}

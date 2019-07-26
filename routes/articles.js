const express = require('express');
const router = express.Router();
const article = require('../controller/article.js');
const common  = require('../lib/common.js');

// TODO 需将状态或失败信息合并进来
router.get('/', async (req, res)=>{
  const author = req.query.author;
  return await article.articles(author);

})
router.get('/:id', async(req, res)=>{
  const id = req.query.article_id;
  return await article.article(id);
})

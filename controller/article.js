const articleSchema = require('../mongodb/articleSchema');
module.exports = {
  articles: async function(author){
    return await articleSchema.find({author: author}).exec();
  }
  article: async function(id){
    return await articleSchema.findOne({article_id: id}).exec();
  }
}

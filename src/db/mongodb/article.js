import mongoose from 'mongoose'

const { Schema } = mongoose
// 定义数据结构
const articleSchema = new Schema({
    article_id: {type: String, default: 1},
    author: {type: String},
    article_name: {type: String},
    article_content: {type: String},
    create_time: {type: Date, default: Date.now}
})

// 返回model，其实例即为document, 用于操作数据
const articleModel = mongoose.model('article', articleSchema)
module.exports = articleModel

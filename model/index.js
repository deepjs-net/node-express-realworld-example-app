const db = require('../db/mongoose')

// console.log(db);

const {
  UserModel,
  TopicModel,
} = db;

const userModel = {
  create: userInfo => {
    UserModel.create(userInfo);
  },
  find: () => {
    UserModel.find().exec();
  },
  findOne: id => {
    UserModel.findOne({user_id: id}).exec();
  },
  update: info => {
    UserModel.update({user_id: info.user_id}, info, true);
  },
  delete: id => {
    UserModel.remove({user_id: id});
  },
}


const topicModel = {
  // 创建一篇文章
  create: info => {
    return TopicModel.create(info);
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getTopics: author => {
    const query = {}
    if (author) {
      query.author = author
    }
    return TopicModel
      .find(query)
      .exec()

    // console.log(res);
    // return res;
  },
  // 通过文章 id 获取一篇文章
  getTopicById: topicId => {
    return TopicModel
      .findOne({ _id: topicId })
      // .populate({ path: 'author', model: 'User' })
      .addCreateAt()
      // .addCommentsCount()
      // .contentToHtml()
      .exec()
  },
  getTopicByTitle: title => {
    return TopicModel
      .findOne({ title })
      .addCreateAt()
      .exec()
  },
  // 通过文章 id 给 pv 加 1
  incPv: topicId => {
    return TopicModel
      .update({ _id: topicId }, { $inc: { pv: 1 } })
      .exec()
  },
  // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawTopicById: topicId => {
    return TopicModel
      .findOne({ _id: topicId })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },
  // 通过文章 id 更新一篇文章
  updateTopicById: (topicId, data) => {
    return TopicModel.update({ _id: topicId }, { $set: data }).exec()
  },
  // 通过文章 id 删除一篇文章
  delTopicById: topicId => {
    return TopicModel
      .deleteOne({ _id: topicId })
      .exec()
      .then(function (res) {
        // 文章删除后，再删除该文章下的所有留言
        // if (res.result.ok && res.result.n > 0) {
        //   return CommentTopicModel.delCommentsByPostId(postId)
        // }
      })
  }
}

exports.userModel = userModel
exports.topicModel = topicModel

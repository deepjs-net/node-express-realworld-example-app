const db = require('../db/mongoose')
const { BaseModel } = require('./base.model')
// console.log(db);

const {
  TestModel,
  TopicModel,
  UserModel,
} = db;

const testModel = new BaseModel(TestModel)
const userModel = new BaseModel(UserModel)
const topicModel = new BaseModel(TopicModel)

exports.testModel = testModel
exports.topicModel = topicModel
exports.userModel = userModel

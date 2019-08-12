import {
  TestModel,
  TopicModel,
  UserModel,
} from '../db/mongoose'
import { BaseModel } from './base.model'
// console.log(db);

export const testModel = new BaseModel(TestModel)
export const userModel = new BaseModel(UserModel)
export const topicModel = new BaseModel(TopicModel)

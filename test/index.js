const db = require('../db/mongoose')

// console.log(db);

const {
  UserModel,
  TopicModel,
} = db;

// exports.userModel = {
//   create: userInfo => {
//     return User.create(userInfo).exec()
//   },
// }
// TopicModel.create
const userInfo = {
  user_id: 100000,
  user_name: 'cloudyan',
  password: 'xxx',
  nick_name: 'xxx',
  create_at: new Date().toJSON(),
  update_at: new Date().toJSON(),
  intro: '',
};
UserModel.create(userInfo)

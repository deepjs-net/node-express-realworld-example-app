const model = require('../model').userModel;

module.exports = {
  create: userInfo => {
    return model.create(userInfo).exec();
  },
  getUserByName: username => {
    return model
      .findOne({ username })
      .addCreateAt()
      .exec()
  },
}

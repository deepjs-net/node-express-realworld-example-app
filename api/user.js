const model = require('../model').User;

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

const model = require('../models').User;

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

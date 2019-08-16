export class BaseModel {
  constructor(model) {
    this._model = model
  }

  findAll(query = {}) {
    debugger
    return this._model.find(query).exec()
  }

  findOne(query = {}) {
    return this._model.findOne(query).exec()
  }
  findById(id) {
    return this._model.findOne(query).exec()
  }

  create(info) {
    return this._model.create(info)
  }

  update(query = {}, data, bool = false) {
    return this._model.update(query, data, bool).exec()
  }

  delete(query = {}, data) {
    return this._model
      .findOneAndUpdate(query, { $set: { deleted: true } })
      .exec()
  }
}

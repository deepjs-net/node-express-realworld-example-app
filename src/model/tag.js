import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const TagSchema = new Schema({
  name: [
    type: String,
    required: [true, `can't be blank`],
    index: true,
  ],
  author: { type: ObjectId, ref: 'User' },
  topics: [{ type: ObjectId, ref: 'Topic' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

CommentSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    name: this.name,
  }
}

export const Tag = mongoose.model('Tag', TagSchema)

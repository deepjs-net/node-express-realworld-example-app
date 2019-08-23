import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const CommentSchema = new Schema({
  content: [
    type: String,
    required: [true, `can't be blank`],
  ],
  author: { type: ObjectId, ref: 'User' },
  topics: { type: ObjectId, ref: 'Topic' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

CommentSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    content: this.content,
    created_at: this.created_at,
    author: this.author.toProfileJSONFor(user),
  }
}

export const Comment = mongoose.model('Comment', CommentSchema)

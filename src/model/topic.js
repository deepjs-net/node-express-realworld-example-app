import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import softDelete from 'mongoose-delete'
// import { slugify } from 'transliteration'
import { google } from 'translation.js'
import slug from 'slug'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

// const Tags = new Schema({
//   tag: String
// });
const TopicSchema = new Schema({
  title: { type: String },
  desc: { type: String },
  content: { type: String },
  author: { type: ObjectId, ref: 'User' },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  // comments: [{ type: ObjectId, ref: 'Comment' }],
  // top: { type: Boolean, default: false }, // 置顶帖
  // good: {type: Boolean, default: false}, // 精华帖
  // lock: {type: Boolean, default: false}, // 被锁定主题
  //   comment_count: { type: Number, default: 0 },
  //   view_count: { type: Number, default: 0 },
  //   like_count: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

TopicSchema.plugin(softDelete, { indexFields: 'all', overrideMethods: 'all' })
TopicSchema.plugin(uniqueValidator, { message: 'is already taken.' })

TopicSchema.pre('validate', async function(next){
  if(!this.slug)  {
    // 不支持中文? 可以转拼音 https://cnodejs.org/topic/53fd9c742243147e784b69fb
    // 但还是转英文效果最好
    await this.slugify()
  }

  next()
})

TopicSchema.methods.slugify = async function() {
  // https://www.npmjs.com/package/translation.js
  const translate = await google.translate({
    text: this.title,
    from: 'zh-CN',
    to: 'en',
  })
  // const translate = { result: [ 'title' ] }
  // console.log(translate)
  /* eslint no-bitwise: 0 */
  this.slug = slug(translate.result.join( ).toLowerCase()) + '-' + (Math.random() * (36 ** 6) | 0).toString(36)
}

TopicSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    slug: this.slug,
    title: this.title,
    desc: this.desc,
    content: this.content,
    author: this.author.toProfileJSONFor(user),
    create_at: this.create_at,
    update_at: this.update_at,
  }
}

TopicSchema.plugin(softDelete)
TopicSchema.index({ created_at: -1 })
// TopicSchema.index({top: -1, last_reply_at: -1});
TopicSchema.index({ author: 1, created_at: -1 })

// TopicSchema.virtual('tabName').get(function () {
//   const tab  = this.tab;
//   const pair = _.find(config.tabs, function (_pair) {
//     return _pair[0] === tab;
//   });

//   if (pair) {
//     return pair[1];
//   } else {
//     return '';
//   }
// });

export const Topic = mongoose.model('Topic', TopicSchema)

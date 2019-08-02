const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const TopicSchema = new Schema({
  title: { type: String },
  desc: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  // top: { type: Boolean, default: false }, // 置顶帖
  // good: {type: Boolean, default: false}, // 精华帖
  // lock: {type: Boolean, default: false}, // 被锁定主题
  comment_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
  like_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
});

// TopicSchema.plugin(BaseModel);
TopicSchema.index({create_at: -1});
// TopicSchema.index({top: -1, last_reply_at: -1});
TopicSchema.index({author_id: 1, create_at: -1});

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

exports.TopicModel = mongoose.model('Topic', TopicSchema);

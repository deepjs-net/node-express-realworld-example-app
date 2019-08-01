var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var TopicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  top: { type: Boolean, default: false }, // 置顶帖
  good: {type: Boolean, default: false}, // 精华帖
  lock: {type: Boolean, default: false}, // 被锁定主题
  comment_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
});

// TopicSchema.plugin(BaseModel);
TopicSchema.index({create_at: -1});
// TopicSchema.index({top: -1, last_reply_at: -1});
TopicSchema.index({author_id: 1, create_at: -1});

// TopicSchema.virtual('tabName').get(function () {
//   var tab  = this.tab;
//   var pair = _.find(config.tabs, function (_pair) {
//     return _pair[0] === tab;
//   });

//   if (pair) {
//     return pair[1];
//   } else {
//     return '';
//   }
// });

mongoose.model('Topic', TopicSchema);

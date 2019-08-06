const mongoose  = require('mongoose');
// const BaseModel  = require('base-model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const Groups = new Schema({
  group: String
});
const ModelSchema = new Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  bio: { type: String },
  groups: [Groups],
  github_id: { type: String },
  inviter_id: { type: ObjectId },
  invite_code: { type: String },
  score: { type: Number, default: 0 },
  grade: { type: String },
  deleted: {type: Boolean, default: false},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

// ModelSchema.plugin(BaseModel);
ModelSchema.index({create_at: -1});
ModelSchema.index({inviter_id: 1, create_at: -1});
ModelSchema.index({user_id: 1}, {unique: true});
ModelSchema.index({username: 1}, {unique: true});
ModelSchema.index({score: -1});
ModelSchema.index({github_id: 1});

ModelSchema.pre('save', function(next){
  const now = new Date();
  this.update_at = now;
  next();
});

exports.TestModel = mongoose.model('Test', ModelSchema);

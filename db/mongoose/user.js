import mongoose from 'mongoose'
// const BaseModel = require('./base_model');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  bio: { type: String },
  // email: { type: String},

  topic_count: { type: Number, default: 0 },
  comment_count: { type: Number, default: 0 },
  // is_star: { type: Boolean },
  // score: { type: Number, default: 0 },
  // level: { type: String },
  // active: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

// UserSchema.plugin(BaseModel);

UserSchema.index({username: 1}, {unique: true});
// UserSchema.index({email: 1}, {unique: true});
// UserSchema.index({score: -1});
// UserSchema.index({githubId: 1});
// UserSchema.index({accessToken: 1});

UserSchema.pre('save', function(next){
  const now = new Date();
  this.update_at = now;
  next();
});

export const UserModel = mongoose.model('User', UserSchema);

const mongoose  = require('mongoose');
// const BaseModel = require('./base_model');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true },
  user_name: { type: String },
  password: { type: String },
  // email: { type: String},

  score: { type: Number, default: 0 },
  post_count: { type: Number, default: 0 },
  comment_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  is_star: { type: Boolean },
  level: { type: String },
  active: { type: Boolean, default: false },
});

// UserSchema.plugin(BaseModel);

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({score: -1});
// UserSchema.index({githubId: 1});
// UserSchema.index({accessToken: 1});

UserSchema.pre('save', function(next){
  const now = new Date();
  this.update_at = now;
  next();
});

mongoose.model('User', UserSchema);

import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../config'

const { secret } = config.session
// const BaseModel = require('./base_model');

const Schema = mongoose.Schema;
const ObjectId  = Schema.Types.ObjectId;

const UserSchema = new Schema({
  // user_id: { type: String, required: true },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, `can't be blank`],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, `can't be blank`],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  hash: String,
  salt: String,
  deleted: { type: Boolean, default: false },
  bio: String, // Short bio about you
  avatar: String,
  // email: { type: String},
  // favorites: [{
  //   type: ObjectId,
  //   ref: 'topic',
  // }],
  // following: [{
  //   type: ObjectId,
  //   ref: 'user',
  // }],
  // topic_count: { type: Number, default: 0 },
  // comment_count: { type: Number, default: 0 },
  // is_star: { type: Boolean },
  // score: { type: Number, default: 0 },
  // level: { type: String },
  // active: { type: Boolean, default: false },
  // status: String,
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

// UserSchema.plugin(BaseModel);
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.verifyPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    bio: this.bio,
    avatar: this.avatar,
    deleted: this.deleted,
    token: this.generateJWT(),
  };
};

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    bio: this.bio,
    avatar: this.avatar,
    deleted: this.deleted,
  };
};

UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    avatar: this.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    // following: user ? user.isFollowing(this._id) : false
  };
};


UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
// UserSchema.index({score: -1});
// UserSchema.index({githubId: 1});
// UserSchema.index({accessToken: 1});

UserSchema.pre('save', function(next){
  const now = new Date();
  this.update_at = now;
  next();
});

export const User = mongoose.model('User', UserSchema);

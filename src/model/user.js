import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import softDelete from 'mongoose-delete'
// import BaseModel  from './base.model'
import config from '../config'

const { secret } = config.session

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const UserSchema = new Schema({
  // 六位自增 100000 可以使用 findAndModify(原子操作)来保证序列唯一(某个表存id，取此数据无则新建，有则 +1 $inc)
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
  bio: String, // Short bio about you
  avatar: String,
  salt: String,
  hash: String,

  all_comment: [],
  all_reply: [],
  // deleted: { type: Boolean, default: false },
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
  created_at: { type: Date, default: Date.now, index: true },
  updated_at: { type: Date, default: Date.now },
}, {
  // https://www.cnblogs.com/jaxu/p/5595451.html
  // https://mongoosejs.com/docs/guide.html#timestamps
  // timestamps: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

UserSchema.plugin(softDelete, { indexFields: 'all', overrideMethods: 'all' })
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.methods.verifyPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 30) // 时效 60天

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000, 10), // 授权时效
    },
    secret,
  )

  // jwt.sign(tokenObj, secretKey, {
  //   expiresIn: 86400 * 30, // 授权时效30天
  // })
}

UserSchema.methods.toAuthJSON = function(authorized) {
  const user = {
    id: this._id,
    username: this.username,
    email: this.email,
    bio: this.bio,
    avatar: this.avatar,
    // deleted: this.deleted,
  }
  if (authorized) {
    user.token = this.generateJWT()
  }
  return user
}

UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    email: this.email,
    username: this.username,
    bio: this.bio,
    avatar: this.avatar || '/img/avatar-default.jpg',
  }
}

UserSchema.index({ username: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })
// UserSchema.index({score: -1});
// UserSchema.index({githubId: 1});
// UserSchema.index({accessToken: 1});

// UserSchema.pre('save', function(next) {
//   const now = new Date()
//   this.update_at = now
//   next()
// })

export const User = mongoose.model('User', UserSchema)

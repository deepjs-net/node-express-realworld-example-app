import mongoose from 'mongoose'
import config from '../../config'
import logger from '../../common/logger'

// 创建一个数据库连接
// mongodb://user:pass@ip:port/database
const DB_URL = config.mongodb;

// 连接
// mongoose.createConnection(uri, { poolSize: 4 })
mongoose.connect(DB_URL, {
  poolSize: 20,
  useCreateIndex: true,
  useNewUrlParser: true
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', DB_URL, err.message);
    process.exit(1);
  }
});

const mdb = mongoose.connection;
// mongoose.disconnect(callback)

// 连接成功
mdb.on('connected', res => {
  console.log('Mongoose connection open to ' + DB_URL);
})
mdb.on('disconnected', res => {
  console.log('Mongoose connection disconnected');
})

// 连接异常
mdb.on('error', err => {
  console.log('Mongoose connection error: ' + err);
})

mdb.once('open', function() {
  // we're connected!
})

export const db = mongoose

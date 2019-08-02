const mongoose = require('mongoose')
const config = require('../../config')
const logger = require('../../common/logger')

const dbc = config.dev.mongodb;

// 创建一个数据库连接
// mongodb://user:pass@ip:port/database
const DB_URL = `mongodb://${dbc.host}:${dbc.port}/${dbc.dbname}`;

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

const db = mongoose.connection;

// 连接成功
db.on('connected', res => {
  console.log('Mongoose connection open to ' + DB_URL);
})
db.on('disconnected', res => {
  console.log('Mongoose connection disconnected');
})

// 连接异常
db.on('error', err => {
  console.log('Mongoose connection error: ' + err);
})

db.once('open', function() {
  // we're connected!
})

module.exports = mongoose


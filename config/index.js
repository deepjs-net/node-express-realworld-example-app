
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

let mongodb = {
  host: '127.0.0.1', //
  port: 27017, //
  dbname: 'nblog',
  user: 'xiaohan',
  password: 'xiaohan',
};

if (!isProd) {
  mongodb = {
    host: 'localhost', //
    port: 27017, //
    dbname: 'nblog',
    user: 'xiaohan',
    password: 'xiaohan',
  };
}

const config = {
  // debug 为 true 时，用于本地调试
  debug: !isProd,
  title: 'Nblog',
  description: 'Nblog: Node.js Blog',
  keywords: 'nodejs, node, express, connect, socket.io',
  port: 3002,
  db: {

  },
  mongodb: `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.dbname}`,
  log_dir: path.join(__dirname, '../logs'),
  session: {
    key: 'session_id',
    secret: 'YV:QfJ4aR#^tR$V', // https://randomkeygen.com/
    maxAge: 2592000000, // 86400*30
  },
  auth_cookie_name: 'nblog',
  qa: {

  }
}

export default config;

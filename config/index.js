
const path = require('path');

const config = {
  debug: false,
  title: 'Nodeclub', // 社区名字
  description: 'Nodeclub: Node.js 俱乐部', // 社区的描述
  keywords: 'nodejs, node, express, connect, socket.io',
  dev: {
    port: 3002,
    mongodb: {
      host: '127.0.0.1', //
      port: 27017, //
      dbname: 'nblog',
      user: 'xiaohan',
      password: 'xiaohan',
    },
  },
  log_dir: path.join(__dirname, '../logs'),
  qa: {

  }
}

module.exports = config;

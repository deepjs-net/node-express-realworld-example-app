const mongoose = require('mongoose');
mongoose.connect('mongodb://ip:host/n_log', {
  userMongoClient: true
});

let db = mongoose.connection;
db.on('connected', function(){
    console.log('connected!!!');
});
db.on('error', function(err){
    console.log('连接失败',err);
});
db.once('open', function(){
    console.log('连接成功')
},function(err){
    console.log(err);
});

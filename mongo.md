# mongo

## mongodb 启动命令

启动：mongod --dbpath path --logpath log
连接：mongo --host address --port 27017

## node 操作mongodb的库 mongodb 或 mongoose

1. mongoose是odm，Object-Document Mapping 即对象文档映射，在程序代码中定义一下数据库中的数据格式，操作时通过它们

```javascript
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myproject');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  var userSchema = new mongoose.Schema({
    user:{ username:String,
      password:String
    },
    contents:{
      title:String,
      poster:String,
      post:String,
      time:Date,
      imgs:[],
      comment:[]
     }
    });
    var User = mongoose.model('user', userSchema);
    var Frank = new User({
      user:{ username:'Frank',
        password:'12345678'
      },
    });
    Frank.save(function (err) {
      console.log('保存成功');
    });
});
```

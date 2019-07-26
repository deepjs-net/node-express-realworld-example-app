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

## 字段类型

String      字符串
Number      数字
Date        日期
Buffer      二进制
Boolean     布尔值
Mixed       混合类型
ObjectId    对象ID
Array       数组

## 常用约束

required: 数据必须填写
default: 默认值
min: 最小值(只适用于数字)
max: 最大值(只适用于数字)
match: 正则匹配(只适用于字符串)
enum:  枚举匹配(只适用于字符串)
validate: 自定义匹配

## vscode配置参数

1. protocol 协议，inspector, legacy
2. port
3. address
4. sourceMaps 是否启动sourceMaps
5. outFiles 在源码上打断点时，试着找到生成的js对应的outFiles
6. restart
7. autoAttachChildProcesses 允许启动子进程
8. timeout
9. stopOnEntry
10. localRoot
11. remoteRoot
12. smartStep 与soureMap一起用
13. skipFiles
14. trace
15. program 项目debug的绝对路径
16. args
17. cwd 在些目录进行debug
18. runtimeExecutable 执行命令的绝对路径，默认是node，也可以是npm, node, nodemon与restart一起使用
19. runtimeArgs 参数 ["key","value"]
20. runtimeVersion 版本
21. env {"key": "value"}
22. envFile  本地环境变量
23. console
24. outputCapture
25. processId 启动一个进程 ${command: PIckProcess}

## 使用
1. 设置断点
2. 选择toggle auto attach
3. 在vscode终端里运行 node --inspect/inspect-brk path
4. command+F4打开引入的另一个文件

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
Schema.Types.ObjectId

## 常用约束

required: 数据必须填写
default: 默认值
min: 最小值(只适用于数字)
max: 最大值(只适用于数字)
match: 正则匹配(只适用于字符串)
enum:  枚举匹配(只适用于字符串)
validate: 自定义匹配

## 静态方法，通过Schema对象的statics属性给model添加的方法

- 创建或更新数据
  1. create()
  2. inserrtMany()
- 查询
  1. find()
  2. findById()
  3. findOne()
- 更新
  1. update(condition, doc, [options], [callback])
    - safe (boolean)： 默认为true。安全模式。
    - upsert (boolean)： 默认为false。如果不存在则不创建新记录。
    - multi (boolean)： 默认为false。是否更新多个查询记录。
    - runValidators： 如果值为true，执行Validation验证。
    - setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
    - strict (boolean)： 以strict模式进行更新。
    - overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。
  2. updateOne()
  3. updateMany()
  4. findByIdAndUpdate()
  5. findOneAndUpdate()

- 其他处理方法
  1. exec(err, docs)
  2. then()

- 后续处理方法

sort 排序
skip 跳过
limit 限制
select 显示字段
exect 执行
count 计数
distinct 去重

- 连表操作 population(path, [select], [model], [match], [options])
path 要关联的表
select 字段
model 关联字段的model
match 查询条件
options 其他查询条件或后续操作

- 删除
  - remove()
  - findOneAndRemove()
  - findByIdAndRemove()

- 条件使用规则

- 查询条件
$or　　　　     或关系
$nor　　　     或关系取反
$gt　　　　    大于
$gte　　　     大于等于
$lt　　　　    小于
$lte　　　     小于等于
$ne　　        不等于
$in　　        在多个值范围内
$nin　　       不在多个值范围内
$all　　    　 匹配数组中多个值
$regex　　    正则，用于模糊查询
$size　　   　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　  　取模运算
$near　　　   邻域查询，查询附近的位置（基于LBS）
$exists　　   字段是否存在
$elemMatch　  匹配内数组内的元素
$within　　　 范围查询（基于LBS）
$box　　　  　 范围查询，矩形范围（基于LBS）
$center　　　  范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　  　查询字段集合中的元素（比如从第几个之后，第N到第M个元素)
{$where: "expression" / function}

## 字段修改器
$inc          增加或减少
$set          指定字段值
$unset        删除一个键 {$unset: {age: ''}}

## 数组修改
$push
$addToSet
$pop
$pull


## 实例方法，通过Schema对象的methods给entity添加方法

1. save() 对model实例进行保存

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

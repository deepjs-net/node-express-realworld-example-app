# 数据库设计

## 规则

- 全部小写命名，禁止出现大写，多个单词使用`_`分割 (**这里我们可以采用小驼峰**)
- 禁止使用数据库关键字，如：name，time ，datetime，password等
- 数据库、表、字段等所有名称使用英文单词或英文短语或相应缩写，禁止使用汉语拼音，且均**使用单数形式命名**
- 字段名称一般采用名词或动宾短语
- 在命名表的列时，不要重复表的名称
- 不要在列的名称中包含数据类型
- 字段命名使用完整名称，禁止缩写 如 uid pid，应使用 user_id
- 命名规则一致，不要 userid username 应为 user_id user_name
- 用尽量少的存储空间来存储一个字段的数据
- 尽量遵守第三范式的标准（3NF）

- 系统中所有逻辑型中数值0表示为“假”，数值1表示为“真”，datetime、smalldatetime类型的字段没有默认值，必须为NULL
- 所有字段在设计时，除以下数据类型timestamp、image、datetime、smalldatetime、uniqueidentifier、binary、sql_variant、binary 、varbinary外，必须有默认值，字符型的默认值为一个空字符值串’’，数值型的默认值为数值0，逻辑型的默认值为数值0

## user

https://api.github.com/users/cloudyan

- user_id 用户id
- username 用户名
- email
- hash
- salt
- deleted
- avatar
- create_at 创建时间 2011-07-13T14:07:57Z
- update_at 更新时间 2019-07-22T14:29:51Z
- bio 介绍
- nickname 昵称

## topic

- title 标题
- author 作者
- desc 描述
- content 正文
- views_count 浏览数
- likes_count 点赞数
- comments_count 评论数
- create_at 创建时间
- update_at 更新时间

## tags

- tag_id
- tag

## comments

- comment_id
- comment

Models 之间的关系

博客系统设计

- one user
  - many post
- one post
  - one author
  - many tag
- one tag
  - many post
- 收藏、关注

评论系统设计

- user
  - many comment
  - many reply_to
- post
  - many comment
- comment
  - one post
  - one user
  - ?one replay_to

常用表设计

- 系统表（S_）：System，系统配置相关的基本信息表。系统用户表（S_USER）、系统角色表（S_ROLE）、系统菜单（S_LINK_MENU）、操作日志（S_OPERATION_LOG）、登录日志（S_LOGIN_LOG）、系统字典（S_DICTIONARY）、系统字典类型（S_DICTIONARY_TYPE）等。
- 字典表（D_）：Dictionary，非系统字典外的字典表。在“设计规范”——“相关注释”——“字典字段”中提到过字典表的定义，除了数据库中的通用字典表，还有一些常见表，比如地区表（D_REGION）、ICD编码（D_ICD）等，也是一种字典表，这里的D_前缀即加在这类字典表名前面。
- 中间表（R_）：Relationship，多对多关系中间表。具体命名方式建议为：R_主表名_从表名，在多对多关系中其实不分主从表，这里我们规定核心表为主表，另外一个为从表。比如用户角色关系中，用户表（S_USER）为主、角色（S_ROLE）表为从，那中间表就命名为R_USER_ROLE。当中间表名超长时，则根据实际情况缩写主从表名，建议优先缩写从表表名。
- 业务表（B_）：Business，核心业务涉及的基本信息表。这里的业务是非系统配置业务相关的，比如登录、注册、权限这些业务涉及的表都是和系统配置相关的，前缀应该是S_，而非B_。比如在线商城的项目中订单业务涉及的表即是核心业务表，会诊系统中会诊单业务涉及的表即是核心业务表，如果项目庞大，涉及业务较多，可以在B后面继续加单字母区分不同的业务，BA_、BB_、BC_……，没必要非得和某个英文对应，只是个代号，和项目组的人员说明即可

参考：

- https://cloud.tencent.com/developer/article/1054482
- https://www.jianshu.com/p/7e60dbd59138
- MongoDB 数据库引用（手动引用 vs DBRefs）
  - https://www.runoob.com/mongodb/mongodb-database-references.html
  - https://mongoosejs.com/docs/populate.html
  - https://segmentfault.com/a/1190000002727265
  - https://www.cnblogs.com/jaxu/p/5595451.html
  - https://mongoosejs.com/docs/guide.html#timestamps

扩展阅读

- https://www.ruanyifeng.com/blog/2014/07/database_implementation.html

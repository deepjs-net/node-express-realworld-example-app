# 表设计

https://cloud.tencent.com/developer/article/1054482

- 全部小写命名，禁止出现大写，多个单词使用`_`分割
- 禁止使用数据库关键字，如：name，time ，datetime，password等
- 用单数形式表示名称
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
- create_at 创建时间 2011-07-13T14:07:57Z
- update_at 更新时间 2019-07-22T14:29:51Z
- bio 介绍
- nickname 昵称

## topic

- title 标题
- author_id 作者
- desc 描述
- content 正文
- author_id 作者
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

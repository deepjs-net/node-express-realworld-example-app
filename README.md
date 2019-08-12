# N-blog

使用 Express + MongoDB 搭建多人博客

## debug 测试环境的代码

1. npm start:debug
2. http://ip:9229/json/version 查看远程调试是否已启动
3. 如果是多个进程，即存在多个端口，在launch.json配置

## 调试

1. `node --inspect=[127.0.0.1:9229] ./app.js`
2. chrome 浏览器打开 `chrome://inspect`

也可以使用

```js
// --watch 在当前目录或其子目录中修改文件时，PM2可以自动重新启动应用程序
"dev": "pm2 start app.js --node-args='--inspect-brk' --watch",
```

参考文档: https://nodejs.org/en/docs/guides/debugging-getting-started/

## 目标达成

- nodejs 搭建服务
- express 的使用
- MongoDB 的使用

## 项目设计

- 路由控制
- 用户系统
- 链接数据库
- 文章管理系统
- 权限控制
- 留言系统
- 日志跟踪
- 测试
- 部署

## 项目结构

文件名，文件夹名，数据库字段名，全用单数

```bash
./
├── LICENSE
├── README.md
├── api/              # 编写业务逻辑层，并暴露 openApi
├── config/           # 配置
├── controller/       # 解析用户的输入，处理后返回相应的结果
├── db/               # 数据库连接操作
├── docs/
├── logs/
├── middleware/       # 中间件
├── model/            # 操作数据库的方法
├── public/           # 静态资源
├── schedule/         # 定时任务
├── view/             # 放置模板文件
├── web_router.js     # 配置 URL 路由规则
├── api_router.js     # 配置 Api 路由规则
└── app.js            # 自定义启动时的初始化工作
```

## 流程

- 访问 server 经由 router
- 路由转由 controllers 响应
- controllers 调用 api
- api 使用 models 操作数据库
- controllers 将响应的数据填充模板返回

## 功能设计

不要在 UI 上浪费时间，精简实现即可

- 完成用户注册、登录功能
- 完成发布、编辑、评论文章功能

## 思考

- spring
  - 约定优于配置
- 自动化

参考：

- https://github.com/nswbmw/N-blog
- https://expressjs.com/en/4x/api.html
- https://docs.mongodb.com/guides/server/install/
- https://blog.51cto.com/lqding/1735674
- https://github.com/zengzhan/qqzeng-ip
- https://shift-alt-ctrl.iteye.com/blog/2259216

关于 Spring

- https://www.w3cschool.cn/springboot/
- https://www.w3cschool.cn/spring_mvc_documentation_linesh_translation/
- https://www.w3cschool.cn/minicourse/play/springbootrm
- https://github.com/JeffLi1993/springboot-learning-example
- https://www.w3cschool.cn/wkspring/

- 基础 - 入门篇
- 基础 - Web 业务开发篇
- 基础 – 数据存储篇
- 基础 – 数据缓存篇
- 基础 – 日志管理篇
- 基础 – 应用篇
- 提升 – 安全控制及权限篇
- 提升 – 消息服务篇
- 提升 – 源码篇
- 其他篇

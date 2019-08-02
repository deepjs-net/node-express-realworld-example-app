# N-blog

使用 Express + MongoDB 搭建多人博客

## debug 测试环境的代码

1. npm start:debug
2. http://ip:9229/json/version 查看远程调试是否已启动
3. 如果是多个进程，即存在多个端口，在launch.json配置

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

文件名，数据库字段名，全用单数

```bash
./
├── LICENSE
├── README.md
├── api/          # 编写业务逻辑层，并暴露 api 接口
├── config/       # 配置
├── controller/   # 解析用户的输入，处理后返回相应的结果
├── docs
├── logs
├── lib
├── middleware/   # 中间件
├── model/       # 暴露操作数据库的方法
├── public/       # 静态资源
├── schedule/     # 定时任务
├── view/        # 放置模板文件
├── router.js     # 配置 URL 路由规则
└── app.js        # 自定义启动时的初始化工作
```

## 流程

- 访问 server 经由 routes
- 路由转由 controllers 响应
- controllers 调用 api
- api 使用 models 操作数据库
- controllers 将响应的数据填充模板返回

参考：

- https://github.com/nswbmw/N-blog
- https://expressjs.com/en/4x/api.html
- https://docs.mongodb.com/guides/server/install/
- https://blog.51cto.com/lqding/1735674
- https://github.com/zengzhan/qqzeng-ip
- https://shift-alt-ctrl.iteye.com/blog/2259216

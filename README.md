# N-blog

使用 Express + MongoDB 搭建多人博客

## debug 测试环境的代码

1. npm start:debug
2. http://ip:9229/json/version 查看远程调试是否已启动
3. 如果是多个进程，即存在多个端口，在launch.json配置
=======
目标达成

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

```bash
.
├── LICENSE
├── README.md
├── config        # 配置
├── docs
├── api
├── lib
├── logs
├── middlewares
├── models
├── routes
├── views
└── index.js
```

参考：

- https://github.com/nswbmw/N-blog
- https://expressjs.com/en/4x/api.html
- https://docs.mongodb.com/guides/server/install/

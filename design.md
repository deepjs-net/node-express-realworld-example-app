# 路由

- 用户
  - /login
  - /user
- 查看文章
  - 文章列表 /topics
  - 个人主页 /topics?author=xxx
  - 文章详情 /topic/:topic_id
- 发表文章 /topic/create
- 修改文章 /topic/:topic_id/edit

## api 接口

- 用户
  - `POST /login`
  - `POST /logout`

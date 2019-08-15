# Api 设计

基础功能

- user 用户
  - `POST /user/register`   user.register
  - `POST /user/login`      user.login
  - `POST /user/logout`     user.logout
  - `GET /user/list`        user.getList
  - `GET /user/info`        user.getOne
  - `PUT /user/update`      user.update
  - `DELETE /user/delete`   user.delete
- topic 文章
  - `POST /topic/create`    topic.create
  - `GET /topic/info`       topic.getOne
  - `GET /topic/rawinfo`    topic.getRawOne
  - `GET /topic/list`       topic.getList
  - `POST /topic/update`    topic.update
  - `POST /topic/delete`    topic.delete

增强

- user
  - `GET /user/followlist` user.getFollowList

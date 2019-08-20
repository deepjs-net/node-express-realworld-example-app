# Api 设计

## headers

header 头设置

- `Content-Type: application/x-www-form-urlencoded`
- `Authorization: Bearer {{token}}`

## 基础接口

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
- comment 评论
  - `POST /comment/create`  comment.create
  - `GET /comment/info`     comment.getOne
  - `GET /comment/rawinfo`  comment.getRawOne
  - `GET /comment/list`     comment.getList
  - `POST /comment/update`  comment.update
  - `POST /comment/delete`  comment.delete

## api 增强

- user
  - `GET /user/followlist` user.getFollowList

## API Spec

统一数据结构

```json
{
  "data": {
    ...
  },
  "errmsg": "success",
  "errno": 0,
  "logid": "2cfcdd7f10ba90bxdvb9a477503661e2",
  "timestamp": 1566275210
}
```

`/user/info`

```json
{
  "data": {
    "user": {
      "email": "ccc@xxx.com",
      "token": "tokenccc",
      "username": "ccc",
      "bio": "intro",
      "avatar": ""
    },
  }
}
```

`/user/profile`

```json
{
  "data": {
    "profile": {
      "username": "ccc",
      "bio": "intro",
      "avatar": "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
  },
}
```

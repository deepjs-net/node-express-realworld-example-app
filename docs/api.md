# Api Spec

使用 mongodb，数据库字段名可以直接使用小驼峰，避免无谓的格式转换，比如 userId, userName, pageLimit, pageNum, totalPage, totalCount

这里我们暂时仍然使用 `_` 分割，返回数据全小写，query 参数全小驼峰格式

## headers

header 头设置

- `Content-Type: application/x-www-form-urlencoded`
- `Authorization: Bearer {{token}}`

## 接口数据结构

- ~~参数统一使用 `query` 传递，不使用 `param`~~
- 返回数据都在 data 内，data 外为统一结构
  - 达成预期结果，错误码为 `errno: 0`
  - 产生非预期结果，返回对应的错误码 `errno: 'xxx'` 以及原因 `errmsg: 'xxx'`
  - `logid` 用于跟踪排查错误
- 列表数据支持翻页
  - query 参数
    - `pageLimit` 每页数据数量
    - `pageNum` 页面
- 操作成功，无需反馈数据的，直接返回空 `data`

```json
// return
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

## 基础接口

列表接口支持分页、筛选、分类等

- user
  - `POST /user/create`     user.create 返回新创建的用户信息
  - `POST /user/login`      user.login  返回当前用户信息
  - `POST /user/logout`     user.logout 操作成功直接返回空
  - `GET /user/list`        user.getList 支持分页，筛选
  - `GET /user/info`        user.getOne 返回用户信息
  - `PUT /user/update`      user.update 返回更新后的用户信息
  - `DELETE /user/delete`   user.delete 返回删除的用户信息
- topic 文章/话题
  - `POST /topic/create`    topic.create
  - `GET /topic/list`       topic.getList 支持分页，筛选
  - `GET /topic/feed`       topic.getFeed 订阅
  - `GET /topic/info`       topic.getOne
  - `GET /topic/rawinfo`    topic.getRawOne 原始文档
  - `POST /topic/update`    topic.update
  - `POST /topic/delete`    topic.delete
- tag 标签
  - `POST /tag/create`      tag.create
  - `GET /tag/list`         tag.getList
  - `GET /tag/info`         tag.getOne
  - `POST /tag/update`      tag.update
  - `POST /tag/delete`      tag.delete
- comment 评论
  - `POST /comment/create`  comment.create
  - `GET /comment/list`     comment.getList
  - `GET /comment/info`     comment.getOne
  - `GET /comment/rawinfo`  comment.getRawOne
  - `POST /comment/delete`  comment.delete
- 收藏&关注

### api 增强

- user
  - `GET /user/followlist` user.getFollowList

## 接口详细

### user 用户

- `POST /user/create`

  query 字段校验；用户已存在检测；发放 token

  ```json
  // query
  {
    "email": "",    // required
    "password": "", // required
    "username": "", // required
    "bio": "",
    "avatar": "",
  }

  // return authInfo
  {
    "data": {
      "user": {
        // authInfo
        "username": "cc",
        "bio": "about me",
        "avatar": "",
        "email": "cc@qq.com",
        "token": "ccToken"
      },
    }
  }
  ```

- `POST /user/login`

  使用邮箱、密码登录，返回 authInfo 信息

- `POST /user/logout`

  操作成功，直接返回空数据

  ```json
  {
    "data": {}
  }
  ```

- `GET /user/list`

  ```json
  {
    "data": {
      "list": [
        {
          // ...publicInfo
        }
      ],
      "total_count": 5,
      "page_limit": 2,
      "page_num": 2,
      "total_page": 3
    }
  }
  ```

- `GET /user/info`        user.getOne
- `PUT /user/update`      user.update

  用户 token 校验；字段检测，只允许更新指定的用户属性，白名单设置

  返回修改后的用户信息

- `DELETE /user/delete`   user.delete

### topic 文章/话题

- `POST /topic/create`    topic.create
- `GET /topic/info`       topic.getOne
- `GET /topic/rawinfo`    topic.getRawOne 原始文档
- `GET /topic/list`       topic.getList
- `POST /topic/update`    topic.update
- `POST /topic/delete`    topic.delete

  权限校验，用户只能删除自己的文章

### tag 标签

- `POST /tag/create`      tag.create
- `GET /tag/info`         tag.getOne
- `GET /tag/list`         tag.getList
- `POST /tag/update`      tag.update
- `POST /tag/delete`      tag.delete

### comment 评论

评论不需要单独的用户所有评论的列表，问答类才需要，并且评论和问答是两张表

- `POST /comment/create`  comment.create
- `GET /comment/info`     comment.getOne
- `GET /comment/rawinfo`  comment.getRawOne
- `GET /comment/list`     comment.getList
- `POST /comment/update`  comment.update
- `POST /comment/delete`  comment.delete

参考：

- https://github.com/dsanel/mongoose-delete

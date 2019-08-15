# 身份认证

身份认证的两种方式

- 基于cookie(sesssion_id 存放到 cookie 中)
  - express-session + session-xxx-store
- 基于Token令牌
  - jsonwebtoken + express-jwt

## 基于 Token 令牌

考虑如下几个问题

- token 是否要保存在服务端？
- token 是否要刷新机制？

[JWT](https://jwt.io/introduction/) 由三部分组成头部+载荷+签名 HEAD Payload Signature

```js
// Header
{
  "alg": "HS256", // 所使用的签名算法
  "typ": "JWT"
}

// Payload
{
  // 该JWT的签发者
  "iss": "luffy",
  // 这个JWT是什么时候签发的
  "iat":1441593502,
  // 什么时候过期，这是一个时间戳
  "exp": 1441594722,
  // 接收JWT的一方
  "aud":"www.youdao.com",
  // JWT所面向的用户
  "sub":"any@126.com",
  // 上面是JWT标准定义的一些字段，除此之外还可以私人定义一些字段
  "username": "cloudyan"
}

// Signature 签名
将上面两个对象进行base64编码之后用.进行连接，然后通过HS256算法进行加密就形成了签名，一般需要加上我们提供的一个密匙，例如secretKey: 'name_luffy'
const base64url = require('base64url')

const base64header = base64url(JSON.stringify(header));
const base64payload = base64url(JSON.stringify(payload));
const secretKey = 'name_luffy';
const signature = HS256(`${base64header}.${base64payload}`,secretKey);
// JWT
// 最后就形成了我们所需要的JWT:
const JWT = base64header + "." + base64payload + "." + signature;
// 它长下面这个样子：
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```

## 基于cookie

参考

- [Express + JWT用户认证最轻实践](https://juejin.im/post/5b06c6baf265da0db4791805)

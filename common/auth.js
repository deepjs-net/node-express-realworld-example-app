import jwt from 'express-jwt'
import config from '../config'

const { secret } = config.session

function getTokenFromHeader(req){
  const { authorization = '' } = req.headers
  if (authorization) {
    const temp = authorization.split(' ')
    if (temp[0] === 'Token' || temp[0] === 'Bearer') {
      return temp[1]
    }
  } else if (req.query && req.query.token) {
    return req.query.token
  }

  return null;
}

export default {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }).unless({
    path: ['/api/user/login', '/api/user/register']
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  })
}


/**

身份认证的两种方式

- 基于cookie(sesssion_id 存放到 cookie 中)
- 基于Token令牌（推荐）

JWT 由三部分组成头部+载荷+签名 HEAD Payload Signature

```js
// Header
{
  "alg": "HS256",//所使用的签名算法
  "typ": "JWT"
}

// Payload
{
  //该JWT的签发者
  "iss": "luffy",
  // 这个JWT是什么时候签发的
  "iat":1441593502,
  //什么时候过期，这是一个时间戳
  "exp": 1441594722,
  // 接收JWT的一方
  "aud":"www.youdao.com",
  // JWT所面向的用户
  "sub":"any@126.com",
  // 上面是JWT标准定义的一些字段，除此之外还可以私人定义一些字段
  "form_user": "fsdfds"
}

// Signature 签名
将上面两个对象进行base64编码之后用.进行连接，然后通过HS256算法进行加密就形成了签名，一般需要加上我们提供的一个密匙，例如secretKey:'name_luffy'
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
作者：luffyZh
链接：https://juejin.im/post/5b06c6baf265da0db4791805
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。```

*/

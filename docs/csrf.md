# CSRF

## CSRF是什么

CSRF（Cross-site request forgery），中文名称：跨站请求伪造，也被称为：one click attack/session riding，缩写为：CSRF/XSRF。

## CSRF可以做什么

你这可以这么理解CSRF攻击：**攻击者盗用了你的身份，以你的名义发送恶意请求**。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。

完成一次CSRF攻击，受害者必须依次完成两个步骤：（这个流程目前的浏览器不通，而且现在更多的场景是前后端分离）

1. 登录受信任网站A，并在本地生成Cookie。
2. 在不登出A的情况下，访问危险网站B。

## 如何减少 CSRF 攻击

- 仅仅使用 JSON Api
- 禁用 CORS
- 检查 header referrer
- GET 请求不应该更改数据库中的任何数据
- 避免使用 POST（因为 `<form>` 只能使用 get post 方法）
- 不要使用 `method-override`, 就只使用 ajax
- 最终的解决方案是使用 CSRF Tokens（令牌）
  - 确保 ajax 无法访问 CSRF 令牌
- 如使用 cookie，就一定用 `httpOnly`

参考

- https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html
- https://zhuanlan.zhihu.com/p/22521378
- https://github.com/pillarjs/understanding-csrf
- https://www.npmjs.com/package/csurf

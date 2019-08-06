

// 需要管理员权限
exports.adminRequired = function (req, res, next) {
  if (!req.session.user) {
    return res.render('notify/notify', { error: '你还没有登录。' });
  }

  if (!req.session.user.is_admin) {
    return res.render('notify/notify', { error: '需要管理员权限。' });
  }

  next();
}

// 需要登录权限
exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(403).send('forbidden!');
  }

  next();
};

exports.blockUser = function () {
  return function (req, res, next) {
    if (req.path === '/signout') {
      return next();
    }

    if (req.session.user && req.session.user.is_block && req.method !== 'GET') {
      return res.status(403).send('您已被管理员屏蔽了。有疑问请联系 @alsotang。');
    }
    next();
  };
};

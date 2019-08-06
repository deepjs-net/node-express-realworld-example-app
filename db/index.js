const db = require('./mongoose')
// const db = require('./mongodb')

Object.keys(db).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return db[key];
    }
  });
});

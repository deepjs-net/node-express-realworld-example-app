// https://segmentfault.com/a/1190000018358854

// babel.conig.js 是对整个项目都生效的配置，与 package.json 同级。
// .babelrc.js 项目局部配置，是对 `待编译文件` 生效的配置
// babelrc寻找策略是: 只会向上寻找到本包的 package.json 那一级(可以配置rootMode: 'upward'对全局项目有效)
// node_modules下面的模块一般都是编译好的，请剔除掉对他们的编译。如有需要，可以把个例加到 babelrcRoots 中。

module.exports = {
  // 'rootMode': 'upward', // 针对 monorepo 配置
  // 允许这两个子 package 加载 babelrc 相对配置
  // babelrcRoots: ['.', './src'],
  'presets': [
    [
      '@babel/preset-env',
      // {
      //   'targets': {
      //     'esmodules': true
      //   }
      // }
    ]
  ]
}

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  env: {
    node: true
  },
  // extending airbnb config and config derived from eslint-config-prettier
  // https://www.npmjs.com/package/@vue/eslint-config-prettier
  // 检测rules 冲突: eslint --print-config . | eslint-config-prettier-check
  // https://github.com/prettier/eslint-config-prettier#special-rules
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    // 'plugin:node/recommended',
  ],
  plugins: [
    // 'import',
    'prettier',
  ],
  // plugins: ['prettier'],

  // https://cn.eslint.org/docs/4.0.0/rules/
  // 根据需要修改 rules，详见 http://eslint.org/docs/rules/
  // 推荐的编码风格 https://github.com/airbnb/javascript
  // add your custom rules here
  rules: {
    // prettier.config.js or .prettierrc.js
    // https://segmentfault.com/a/1190000012909159
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     // https://prettier.io/docs/en/options.html
    //     // printWidth: 100,
    //     singleQuote: true,
    //     jsxBracketSameLine: true, // 是否多行JSX元素最后一行的末尾添加 > or 新起一行
    //     trailingComma: 'es5', // none es5 or all
    //     // arrowParens: 'avoid', // avoid or always 箭头函数是否总是加圆括号
    //     proseWrap: 'always', // 当超出print width就折行
    //     // parser: 'flow',
    //     semi: false,
    //     trailingComma: 'all',
    //     // semicolons: true,
    //     // bracketSpacing: true, // 花括号内部前后有空格
    //     // quoteProps: 'as-needed',
    //     // jsxBracketSameLine: false,
    //     // filepath: './src/**/*.js',
    //   },
    // ],
    // 'vue/no-unused-components': '1',
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'always-multiline',
    //     objects: 'always-multiline',
    //     imports: 'always-multiline',
    //     exports: 'always-multiline',
    //     functions: 'ignore',
    //   },
    // ],
    // "max-len": ["error", {
    //   "code": 120,
    //   "ignoreUrls": true,
    //   "ignorePattern": true,
    // }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': 'off',
    'no-mixed-operators': 'off',
    // 'no-multi-spaces': [
    //   'error',
    //   {
    //     ignoreEOLComments: true,
    //   },
    // ],
    // 'no-multiple-empty-lines': [
    //   'error',
    //   {
    //     max: 2,
    //     maxEOF: 1,
    //   },
    // ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'no-shadow': [
      'error',
      {
        allow: [
          'res',
          'data',
          'err',
          'cb',
          'state',
          'resolve',
          'reject',
          'done',
        ],
      },
    ],
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        // args: 'after-used',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'prefer-template': 'off',
    'prefer-arrow-callback': 'off',
    // "quotes": ["error", "single", {
    //   "avoidEscape": true,
    //   "allowTemplateLiterals": true,
    // }],
    'require-yield': [1],
    // 'space-before-function-paren': [
    //   'error',
    //   {
    //     anonymous: 'always',
    //     named: 'ignore',
    //     asyncArrow: 'ignore',
    //   },
    // ],
    semi: ['error', 'never'],
    // https://yepbug.com/2018/08/28/what-is-the-benefit-of-prefer-default-export/
    'import/prefer-default-export': 'off', // 输出只有一个变量时使用 export default
    'func-names': 'off',
    'consistent-return': 'off',
  },

};

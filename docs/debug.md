# debug

调试

- args 是你的脚本参数
- node_args 是传递给节点可执行文件的参数

使用 pm2 服务，如何让 console.log 出现在控制台

```bash
npx babel src --watch --out-dir dist --ignore view
pm2 start app.js --name nblog --watch dist
pm2 log nblog
```

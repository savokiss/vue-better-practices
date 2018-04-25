# 代码部署

现在的前端在部署代码的时候一般只需要打包上传即可。这个过程如果用 gulp 来做的话会简单很多。
笔者目前只在部署测试环境时使用该方法，因为仿真和生产环境有持续集成工具。
> Gulp 官网： <https://gulpjs.com/>

> Gulp SSH： <https://github.com/teambition/gulp-ssh>

## 安装依赖

1. 在项目下新建一个 `gulpfile.js` 文件

2. 安装相应依赖：
```bash
npm install gulp gulp-ssh --save-dev
```



## 具体代码
下面是 gulpfile 中的代码

```javascript
var gulp = require('gulp')
var fs = require('fs')
var os = require('os')
var SSH = require('gulp-ssh')
var path = require('path')

const DIR_NAME = 'your-nginx-dir' // TO REPLACE

// 测试环境
var sshConfig = {
  host: 'your.testing.host',// TO REPLACE
  port: 22,
  username: 'your-server-user',// TO REPLACE
  privateKey: fs.readFileSync(path.resolve(os.homedir(), '.ssh/id_rsa')) // 服务器上放上你的 public key
}

var gulpSSH = new SSH({
  ignoreErrors: false,
  sshConfig: sshConfig
})

// 上传测试服务器
gulp.task('upload:test', function () {
  return gulp.src('./dist/**/*.*') // 对 vue 项目而言上传 dist 下面的所有文件
    .pipe(gulpSSH.dest(`/your/nginx/dir/${DIR_NAME}/`)) // TO REPLACE 你服务器上对应的 nginx 目录
})

```

上面代码中会读取 本地 `.ssh/id_rsa` 的私钥，需要配置对应的公钥到服务器的 `authorized_keys`

最后在 `package.json` 中配置一个快捷命令即可

```json
"scripts": {
  "deploy": "npm run build && gulp upload:test"
}
```
上面的命令会在 build 完成后立即执行上传操作
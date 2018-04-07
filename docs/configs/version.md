# 版本号管理
现在的前端项目一般都会用到 npm 来管理依赖包，而 npm 包都是有版本号的，这个版本号用的是 `semver` 记法
简单来说就是三个部分分别为： Major, Minor, Patch

> see: [https://semver.org/](https://semver.org/)

## 项目中配置
在项目中配置也很简单，现在的 webpack 项目都支持 `import` json 文件 

在 vue 项目 `src/main.js` 中

```javascript
import pkg from '../package.json'

// ... vue bootstrap code

// window 上存放版本号
window.res = {
  name: pkg.name,
  version: pkg.version
}

console.log(`APP ${pkg.name} v${pkg.version} is running`)
```

个人习惯将版本号挂在 window 上，并在控制台打出。

## 风险提示
上面的代码有个风险就是，`package.json` 的内容会加载到你的 js 中，所以 js 源码里面会包含 package.json 中所有的内容

如果不能忍受的话，简单的做法就是新建一个 `res.json` 文件管理版本号和你想管理的东西
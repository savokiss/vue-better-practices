# 配置文件管理
大家应该对 vue-cli 很熟悉了，最常用的可能是其中的 webpack 模板，

> see: [webpack template](https://github.com/vuejs-templates/webpack) 

## 内置配置
这个模板中有 config 文件夹，里面包含三个配置文件，`index.js` 就不说了，`dev.env.js` 和 `prod.env.js` 是对应 `process.env.NODE_ENV` 的环境变量的配置文件，这两个配置文件里面是可以添加自己的内容的，下面是我的配置

- `dev.env.js`

    ```javascript
    'use strict'
    const merge = require('webpack-merge')
    const prodEnv = require('./prod.env')
    
    module.exports = merge(prodEnv, {
      NODE_ENV: '"development"',
      API_URL: '"http://your.development.api"'
    })
    
    ```

- `prod.env.js`

    ```javascript
    'use strict'
    
    module.exports = {
      NODE_ENV: '"production"',
      API_URL: '"http://your.production.api"'
    })
    ```

Vue 的配置文件会根据不同的的 `NODE_ENV` 来走不同的配置文件，上面配置文件中配置的常量会暴露给 `process.env` 对象，在代码中可以直接使用该对象获取配置，最后在 build 时 webpack 会帮你替换好

个人习惯抽出一个 `@/config.js` 文件放在 src 下面:

```javascript
export const API_URL = process.env.API_URL // 后台接口url
export const REQUEST_TIMEOUT = 30000

export default {
  API_URL,
  REQUEST_TIMEOUT
}
```

然后在 `@/services/api.js`（详见 [Axios封装](/docs/abstract/axios.md) ) 中这样写：

```javascript
import axios from 'axios'
import config from '@/config'
// 创建axios实例
const api = axios.create({
  baseURL: config.API_URL, // 后台 api 的 url
  timeout: config.REQUEST_TIMEOUT, // 请求超时时间
  validateStatus: function (status) {
    return status < 500 // Reject only when the status code is greater than 500
  }
})
// ...axios interceptors
export default api
```

## 扩展配置
在发布代码的时候，我们可能会有多个环境，如 测试环境、仿真环境、生产环境，这些环境的api 地址也都是不同的，下面简单介绍一些如何配置不同环境的 api 地址。

简单来说：我们要做的是在 build 的时候根据情况 build 出不同的 api 地址，所以不需要去管 dev 环境的配置。

这其中其实有两条设置 `process.env` 的路线，先说第一条：

::: tip
配置文件 -> Webpack DefinePlugin -> 业务代码
:::

首先先来看一下 `NODE_ENV` 是在什么时候被设置成 `production` 的，找了下，是在 `build/build.js` 中的最上面

```javascript
// ... some code
process.env.NODE_ENV = 'production'

// ... some code
const webpackConfig = require('./webpack.prod.conf')
```
注意这里引用了 `webpack.prod.conf`，看下：

```javascript
// ... some code
const env = require('../config/prod.env')
// ... some code
const webpackConfig = merge(baseWebpackConfig, {
  // ... some code
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
  ]
})
```

plugins 这里是 webpack 定义变量用的，把 env 整个对象 定义为了 `process.env`，所以我们才能在代码中访问 `process.env`

熟悉 node 的同学都知道，`process.env` 这个东西其实是 node.js 里面的，这里只不过是 webpack 定义的一个变量。

我们要实现的根据不同情况 build 出不同的代码，这本质是在 本地 node 环境完成的，其实用到的是真正的 `process.env`，即第二条设置路线：

::: tip
npm scripts -> SET ENV -> 配置文件
:::

> see: [npm 设置环境变量](https://docs.npmjs.com/misc/config#environment-variables)

我们首先假设要创建的变量名叫 `PROD_ENV`，根据不同，三种不同环境 测试、仿真、生产 分别为: `testing`,`staging`,`production`

在 `package.json` 中
```json
"scripts" : {
    "build": "cross-env PROD_ENV=testing node build/build.js",
    "build:staging": "cross-env PROD_ENV=staging node build/build.js",
    "build:production": "cross-env PROD_ENV=production node build/build.js",
}
```

这里用了一个处理兼容性的 `cross-env`，安装一下即可
```bash
npm i cross-env -D
```

然后我们这个 `PROD_ENV` 变量传到哪里了呢？当然就是后面的 `build.js`，前面说了一个引用管理，可以知道，`config/prod.env.js` 中是可以访问到 `PROD_ENV` 这个变量的，感兴趣的同学可以试一下~

那这样就很好办了，在 `config/prod.env.js` 中：

```javascript
// api 地址
const PROD_ENV_API_HASH = {
  testing: '"//your.testing.server"',
  staging: '"//your.staging.server"',
  production: '"//your.production.server"'
}

module.exports = {
  NODE_ENV: '"production"',
  API_URL: PROD_ENV_API_HASH[process.env.PROD_ENV] // 生产环境 API 地址
}
```

Done，接下来执行不同的命令，就能打包出 API 地址不同的代码了：

```bash
# for testing
npm run build
# for staging
npm run build:staging
# for production
npm run build:production
```
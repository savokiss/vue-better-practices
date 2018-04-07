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

然后在 `@/services/api.js`（详见 [Axios封装](/docs/abstract/axios) ) 中这样写：

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
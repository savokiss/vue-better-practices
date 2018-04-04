# 背景
大家应该对 vue-cli 很熟悉了，最常用的可能是其中的 [webpack](https://github.com/vuejs-templates/webpack) 模板，这个模板中有 config 文件夹，里面包含三个配置文件，`index.js` 就不说了，`dev.env.js` 和 `prod.env.js` 是对应 `process.env.NODE_ENV` 的环境变量的配置文件，这两个配置文件里面是可以添加自己的内容的，下面是我的配置

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
    const merge = require('webpack-merge')
    const prodEnv = require('./prod.env')
    
    module.exports = merge(prodEnv, {
      NODE_ENV: '"development"',
      API_URL: '"http://your.production.api"'
    })
    ```

Vue的配置文件会根据不同的
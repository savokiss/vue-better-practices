# 本地代理

大部分情况，我们用的都是 vue 官方的 webpack 模板，这个模板里面带有很多功能，其中一个是本地代理功能，用来解决开发过程中的跨域问题。

> 简单配置 see: <http://vuejs-templates.github.io/webpack/proxy.html>

> 完整配置 see: <https://github.com/chimurai/http-proxy-middleware>


## 详情配置
编辑 `config/index.js` 中的 `dev.proxyTable`

```javascript
// config/index.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```
上面的配置会将 `/api/anything` 代理到 `http://jsonplaceholder.typicode.com/anything`
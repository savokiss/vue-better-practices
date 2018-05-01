# Axios 封装
axios是官方推荐的 ajax 库，可以同时应用于 browser 和 node.js, 下面介绍下常用的封装方法

> see: [axios](https://github.com/axios/axios)

## axios 实例

笔者习惯将业务请求统一放在 `services` 文件夹下，而所有的 services 都通过 `api.js` 发出请求

新建 `api.js` 文件

```js
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

// intercepters

export default api
```

而上面就是该 axios 实例, 其中 config 文件可以参考：[配置文件管理](/docs/configs/config.md)

## 拦截器

拦截器代码也在 `api.js` 中

```js {4,18}
// request拦截器
api.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    // Do something with request error
    console.log('request err:', error) // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
api.interceptors.response.use(
  res => {
    // 快捷成功
    res.data.ok = res.data.status_code === 200
    return res
  },
  error => {
    console.log('response err:', error) // for debug
    return Promise.reject(error)
  }
)
```

由于 axios 是受 angular.js 的 $q 启发而开发的库，所以拦截器也是和 angular.js 中一样，axios 实例会拦截所有的 request 和 response，然后开发者就可以在其中做一些自定义操作，也可以说是 [AOP](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E4%BE%A7%E9%9D%A2%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1) 操作

上面代码中高亮的第一行就是将业务 token 放在 request header 的 Authorization 中

高亮的第二行是将 response 添加了一个 ok 字段
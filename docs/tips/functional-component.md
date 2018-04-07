# 函数式组件
Vue 中的函数式组件在封装一些非功能组件时很有用，没有实例开销，更轻量。写法稍微复杂一些，具体看官网，下面只说遇到的一些问题

> see: [函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)

## 函数式组件中做路由跳转
由于没有实例（即没有 this 上下文)，在组件中就不能像往常一样使用 `this.$router` 来做路由跳转了，但是了解 es6 模块化的同学就知道，es6 的模块机制是单例的

> see: [ES6 singleton](https://k94n.com/es6-modules-single-instance-pattern)

所以直接像下面这样用就可以了：

```javascript
import router from '@/router'
```

而函数式组件一般都是直接写成 js 文件，给个 render 函数，对写惯了 vue 文件的伙伴来说，官方支持以下语法：
```html
<template functional>
  <div class="your-component"></div>
</template>
```

这个特性是 `vue-loader` 支持的

> see: [vue-loader](https://vue-loader.vuejs.org/zh-cn/features/functional.html)

然而支持的不完全，目前应该只支持 script 内的 props 属性，所以如果想做路由跳转可以这样：

```html
<template functional>
  <div class="your-component" @click="props.router.push('/')">
  </div>
</template>

<script>
import router from '@/router'
export default {
  props: {
    router: {
      type: Object,
      default () {
        return router
      }
    }
  }
}
</script>
```

其他情况还是老老实实写 `render function` 吧~
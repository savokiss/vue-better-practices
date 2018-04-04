# 组件间通信

父到子，子到父的通信方式就不用多说了，其他层级结构的组件通信官方有一个推荐做法：

> see: [vue.js eventHub](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2
)

## 事件总线：
```javascript
// /utils/eventHub.js
// 将在各处使用该事件中心
// 组件通过它来通信
import Vue from 'vue'

export default new Vue()
```

## 派发事件的组件：
```javascript
import eventHub from '@/utils/eventHub'

export default {
  // ...
  methods: {
    onAddTodo () {
      eventHub.$emit('add-todo', { text: 'go shopping' })
    }
  }
}
```

## 接收事件的组件：
```javascript
import eventHub from '@/utils/eventHub'

export default {
  methods: {
    addTodo (params) {
      console.log(params.text) // go shopping
    }
  },
  created () {
    eventHub.$on('add-todo', this.addTodo)
  },
  // 一般在组件销毁前移除监听器，除非你知道你不需要这么做
  beforeDestroy () {
    eventHub.$off('add-todo', this.addTodo)
  }
}
```
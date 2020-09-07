import Toast from './main'

let instance

const plugin = {
  install (Vue, options) {
    let PluginConstructor = Vue.extend(Toast)

    // 安装时即挂载
    if (!instance) {
      instance = new PluginConstructor({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
    }

    function toast (options = {}) {
      if (typeof options === 'string') {
        instance.text = options
      } else if (typeof options === 'object') {
        Object.assign(instance, options)
      }
      instance.show = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          instance.show = false
          resolve('success')
        }, instance.duration)
      })
    }

    Vue.toast = Vue.prototype.$toast = toast
  }
}

export default plugin

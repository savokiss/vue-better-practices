import Loading from '../src/plugins/Loading'
import Toast from '../src/plugins/Toast'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // waiting for ssr
  setTimeout(() => {
    Vue.use(Loading)
    Vue.use(Toast)
  }, 1000)
}

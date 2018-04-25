module.exports = {
  title: 'vue-better-practices',
  description: 'Vue.js better practices',
  ga: 'UUA-118141120-1',
  markdown: {
    config: md => {
      md.use(require('markdown-it-task-lists'), { enabled: true })
    }
  },
  themeConfig: {
    repo: 'savokiss/vue-better-practices',
    // docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      {
        title: '基础配置',
        children: [
          '/docs/configs/proxy',
          '/docs/configs/version',
          '/docs/configs/config',
          '/docs/configs/deploy',
          '/docs/configs/mock',
        ]
      },
      {
        title: '上层封装',
        children: [
          '/docs/abstract/axios',
          '/docs/abstract/services'
        ]
      },
      {
        title: '全局组件',
        children: [
          '/docs/components/loading',
          '/docs/components/toast'
        ]
      },
      {
        title: '实用技巧',
        children: [
          '/docs/tips/communications',
          '/docs/tips/deep-selector',
          '/docs/tips/functional-component'
        ]
      }
    ]
  }
}
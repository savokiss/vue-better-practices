module.exports = {
  title: 'Vue Better Practices',
  description: '实用的 Vue.js 最佳实践合集',
  extendMarkdown(md) {
    md.use(require('markdown-it-task-lists'), { enabled: true })
  },
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UUA-118141120-1'
    }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '/assets/'
      }
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
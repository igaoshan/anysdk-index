export default {
  base: '/',
  // 站点配置
  title: 'AnySDK',
  description: '简化对接多种服务商的组件库',

  // 主题配置
  themeConfig: {
    // 网站标题和logo
    logo: '/logo.png',
    siteTitle: 'AnySDK',

    // 导航栏
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'API参考', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/igaoshan/anysdk-index' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '什么是AnySDK?', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '配置', link: '/guide/configuration' },
            { text: '最佳实践', link: '/guide/best-practices' }
          ]
        }
      ],
      '/components/': [
        {
          text: '存储服务',
          items: [
            { text: 'anysdk-oss', link: '/components/oss/' },
            { text: '快速开始', link: '/components/oss/getting-started' },
            { text: '使用示例', link: '/components/oss/examples' },
            { text: 'API参考', link: '/components/oss/api-reference' }
          ]
        },
        {
          text: '消息服务',
          items: [
            { text: 'anysdk-sms', link: '/components/sms/' },
            { text: '快速开始', link: '/components/sms/getting-started' },
            { text: '使用示例', link: '/components/sms/examples' },
            { text: 'API参考', link: '/components/sms/api-reference' }
          ]
        },
        {
          text: '识别服务',
          items: [
            { text: 'anysdk-ocr', link: '/components/ocr/' },
            { text: '快速开始', link: '/components/ocr/getting-started' },
            { text: '使用示例', link: '/components/ocr/examples' },
            { text: 'API参考', link: '/components/ocr/api-reference' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API参考',
          items: [
            { text: '通用配置', link: '/api/' },
            { text: 'OSS API', link: '/api/oss' },
            { text: 'SMS API', link: '/api/sms' },
            { text: 'OCR API', link: '/api/ocr' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/igaoshan/anysdk-index' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present AnySDK'
    }
  }
}
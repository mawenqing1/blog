const moment = require('moment');
const moment = require('../.vuepress/secret');

module.exports = {
    title: "热爱生活喜欢睡觉",
    description: "热爱生活 喜欢睡觉",
    head: [
        ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }],
        ['meta', { name: 'author', content: '热爱生活 喜欢睡觉' }],
        ['meta', { name: 'keywords', content: '热爱生活 喜欢睡觉的博客  vuepress搭建个人博客  IT博客  前端学习' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    const moment = require('moment')
                    moment.locale("zh-cn")
                    return moment(timestamp).format("LLLL")
                }
            }
        ],
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: {
                    message: "有新的内容.",
                    buttonText: "刷新"
                }
            }
        ],
        [
            '@vssue/vuepress-plugin-vssue',
            {
                // 设置 `platform` 而不是 `api`
                platform: 'github-v4',

                // 其他的 Vssue 配置
                owner: 'mawenqing1',
                repo: 'blog',
                clientId: secret.clientId,
                clientSecret: secret.clientSecret,
                autoCreateIssue: true
            },
        ],
        [
            '@vuepress/back-to-top', true
        ]
    ],
    themeConfig: {
        // logo: '/assets/img/logo.png',
        lastUpdated: '更新时间',
        nav: [
            { text: '主页', link: '/' },
            { text: '先导', link: '/synopsis/guide' },
            {
                text: '前端学习',
                ariaLabel: ' ',
                items: [
                    { text: 'HTML', link: '/frontend/HTML/' },
                    { text: 'JavaScript', link: '/frontend/JavaScript/' },
                    { text: 'CSS', link: '/frontend/CSS/' },
                    { text: 'Vue', link: '/frontend/Vue/' }
                ]
            },
            {
                text: '更多',
                ariaLabel: ' ',
                items: [
                    { text: 'VuePress官网', link: 'https://vuepress.vuejs.org/zh/' },
                    { text: 'MarkDown手册', link: 'http://www.markdown.cn/' }
                ]
            },
            { text: 'GitHub', link: 'https://github.com/mawenqing1/blog' },
        ],
        sidebar: {
            '/synopsis/': [
                'guide',
                'about-me',
                'other'
            ],

        },
    }

}
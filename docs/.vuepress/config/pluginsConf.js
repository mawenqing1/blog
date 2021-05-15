const secret = require('./secret');

module.exports = [
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
            clientId: 'secret.clientId',
            clientSecret: 'secret.clientSecret',
            autoCreateIssue: true
        },
    ],
    [
        "vuepress-plugin-auto-sidebar", {}
    ],
    [
        '@vuepress/back-to-top', true
    ],
    [
        '@vuepress/medium-zoom', {
            selector: 'img'
        }
    ],
]
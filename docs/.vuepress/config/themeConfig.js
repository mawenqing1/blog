module.exports = {
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
                { text: 'CSS', link: '/frontend/CSS/' },
                { text: 'JavaScript', link: '/frontend/JavaScript/' },
                { text: 'TypeScript', link: '/frontend/TypeScript/' },
                { text: 'HTTP', link: '/frontend/HTTP/' },
                { text: 'Vue', link: '/frontend/Vue/' },
                { text: 'React', link: '/frontend/React/' },
            ]
        },
        {
            text: '周报',
            ariaLabel: ' ',
            items: [
                { text: 'Weekly', link: '/Weekly/' }
            ]
        },
        {
            text: '开发工具',
            ariaLabel: ' ',
            items: [
                { text: 'git', link: '/pit/git/' }
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
}
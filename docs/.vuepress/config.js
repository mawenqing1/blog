const moment = require('moment');
const headConf = require('./config/headConf');
const pluginsConf = require('./config/pluginsConf');
const themeConfig = require('./config/themeConfig')

module.exports = {
    title: "热爱生活喜欢睡觉",
    description: "热爱生活 喜欢睡觉",
    head: headConf,
    plugins: pluginsConf,
    themeConfig: themeConfig
}
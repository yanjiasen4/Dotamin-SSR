# Dotamin-SSR

练习用项目。使用vue做前端，nuxt做SSR，egg服务器使用phantomjs进行前端网页截图。 webpage和capture分别是前端渲染服务器和后端截图服务器 

# capture

基于egg.js框架的一个nodejs服务器，使用phantomjs对网站进行截图和保存

# webpage

给予nuxt的一个前端服务器，通过[openDota](https://www.opendota.com/)的API获取dota2数据并进行可视化展示

# 技术栈

## webpage
- [vue](https://cn.vuejs.org/)
- [nuxt](https://nuxtjs.org/)
- [muse-ui](http://www.muse-ui.org/)
- [highcharts](https://www.highcharts.com/)
- [vue-highcharts](https://github.com/weizhenye/vue-highcharts)

## capture
- [egg.js](http://eggjs.org/)
- [phantomjs](https://github.com/amir20/phantomjs-node)

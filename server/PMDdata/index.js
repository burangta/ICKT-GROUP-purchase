// 引入express 解构Router
let { Router } = require('express');
// 暴露接口
module.exports = new Router()
    // 处理移动端首页商品和广告请求数据接口
    .get('/data/home',require('./home'))
    // 处理移动端点击查看商品详情接口
    .get('/data/product',require('./product'))
    // 处理分类请求
    .get('/data/list',require('./list'))
    // 处理关键字搜索请求
    .get('/data/search',require('./search'))
    // 处理排序请求
    .get('/data/sort',require('./sort'))
    // 处理获取新闻列表请求
    .get('/data/getNewsList',require('./getNewsList'))

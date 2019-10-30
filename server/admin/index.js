// 解构Router
let { Router } = require('express');
// 创建Router实例化对象 并暴露接口
module.exports = new Router()
    // 获取用户名请求
    .get('/admin/userinfo',require('./manager/userinfo'))
    // 处理退出请求
    .get('/admin/logout',require('./manager/logout'))
    // 处理编辑页面请求商品信息数据
    .get('/admin/getGoodsDetail',require('./goods/getGoodsDetail'))
    // 处理列表页请求商品列表信息数据
    .get('/admin/getGoodsList',require('./goods/getGoodsList'))
    // 处理广告列表请求
    .get('/admin/getAdsList',require('./ads/getAdsList'))
    // 处理获取某一条广告详情请求
    .get('/admin/getOneAdsDetail',require('./ads/getOneAdsDetail'))
    // 处理获取用户列表请求
    .get('/admin/getUserList',require('./users/getUserList'))
    // 处理用户编辑页面获取用户信息请求
    .get('/admin/getOneUserDetail',require('./users/getOneUserDetail'))
     // 处理获取分类列表请求
    .get('/admin/getTypesList',require('./types/getTypesList'))
    // 处理获取同类商品列表请求
    .get('/admin/getSameTypeGoodsList',require('./types/getSameTypeGoodsList'))
    // 处理获取新闻列表请求
    .get('/admin/getNewsList',require('./news/getNewsList'))
    // 处理登录请求
    .post('/admin/login',require('./manager/login'))
    // 处理修改用户名密码请求
    .post('/admin/modifyUserInfo',require('./manager/modifyUserInfo'))
    // 处理上传商品图片请求
    .post('/admin/uploadImg',require('./goods/uploadImg'))
    // 处理上传创建商品请求
    .post('/admin/createGoods',require('./goods/createGoods'))
    // 处理删除一个商品请求
    .post('/admin/deleteOneGoods',require('./goods/deleteOneGoods'))
    // 处理更新商品请求
    .post('/admin/updateGoods',require('./goods/updateGoods'))
    // 处理创建广告请求
    .post('/admin/createADS',require('./ads/createADS'))
    // 处理删除一条广告请求
    .post('/admin/deleteOneAds',require('./ads/deleteOneAds'))
    // 处理更新某条广告请求
    .post('/admin/updateAds',require('./ads/updateAds'))
    // 处理创建用户请求
    .post('/admin/createUser',require('./users/createUser'))
    // 处理删除用户请求
    .post('/admin/removeOneUser',require('./users/removeOneUser'))
    // 处理修改某个用户请求
    .post('/admin/updateUser',require('./users/updateUser'))
    // 处理创建分类请求
    .post('/admin/createTypes',require('./types/createTypes'))
    // 处理创建新闻请求
    .post('/admin/news/createNews',require('./news/createNews'))
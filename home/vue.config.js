// 引入path
let path = require('path');
// 判断模式
if(process.env.NODE_ENV ==='production') {
    // 配置发布文件位置
    module.exports = {
        // 静态资源
        outputDir: path.join(process.cwd(),'../static/home'),
        // html模板文件
        indexPath: path.join(process.cwd(),'../views/home.html'),
        // 模板中引入资源的目录
        publicPath: '/static/home'
    }
}else {
    // 定义跨域代理目标对象
    let ProxyTarget = {target: 'http://localhost:3000'};
    module.exports = {
        devServer: {
            // 请求代理
            proxy: {
                // 首页请求
                '/data/home': ProxyTarget,
                // 列表页请求
                '/data/list':ProxyTarget,
                // 排序请求
                '/data/sort': ProxyTarget,
                // 搜索词请求
                '/data/search': ProxyTarget,
                // 详情页请求
                '/data/product': ProxyTarget
            }
        }
    }
}
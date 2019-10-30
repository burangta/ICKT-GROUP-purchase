// 引入express
let express = require('express');
// 引入path
let path = require('path');
// 引入ejs
let ejs = require('ejs');
// 引入session
let session = require('express-session');
// 引入body-parser
let bodyParser = require('body-parser');
// 引入静态化配置
let { STATIC } = require('../consts');

module.exports = app => {
    // 设置ejs
    app.set('view engine','ejs');
    // 修改.html拓展名
    app.engine('.html',ejs.__express);
    // 配置session
    app.use(session({
        secret: 'hjagjhghjagjkhjkh',
        resave: true,
        saveUninitialized: false
    }));
    // 配置body_parser
    app.use(bodyParser.json());
    // 处理静态化数据
    for(let key in STATIC) {
        // key: 请求特征 STATIC[key]：需要静态化的目录
        app.use(key,express.static(path.join(process.cwd(),STATIC[key])));
    }
}
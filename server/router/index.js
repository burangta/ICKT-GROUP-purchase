// 引入page中的index.js
let page = require('../page');
// 引入admin中的index.js
let admin = require('../admin');
// 引入PMDdata中的index.js
let PMDdata = require('../PMDdata');
module.exports = app => {
    // 挂载页面路由page
    app.use(page);
    // 挂载后台管理路由admin
    app.use(admin);
    // 挂载移动端PWDdata路由
    app.use(PMDdata);
}
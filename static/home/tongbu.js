// 引入vue
let Vue = require('vue');
// 创建vue实例化对象
let IcktApp = new Vue({
    template: `
        <div>
            <h1>ICKT团购官网</h1>
            <ul>
                <li>飞猪旅行</li>
                <li>电子产品</li>
                <li>喵生鲜</li>
                <li>在线课程</li>
                <li>魅力惠</li>
                <li>益智玩具</li>
                <li>生活服务</li>
                <li>居家</li>
                <li>美妆</li>
                <li>食品</li>
            </ul>
        </div>
    `
})
// 暴露接口
module.exports = IcktApp;

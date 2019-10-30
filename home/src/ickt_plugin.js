// 引入axios
import axios from 'axios';
export default {
    install(vue) {
        // 给原型添加属性$http
        vue.prototype.$http = axios;
        console.log('123')
    }
}
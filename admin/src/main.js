// 引入vue
import Vue from 'vue';
// 引入axios
import axios from 'axios';
// 引入路由
import router from '@/router';
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// 引入富文本编辑器样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
// 引入element-ui
import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入store
import store from '@/store';
// 引入App组件
import App from '@/App';
// 安装axios
Vue.prototype.$http = axios;
// 安装富文本编辑器
Vue.use(VueQuillEditor);
// 安装element-ui
Vue.use(ElementUI);
// 创建vue实例化对象
export default new Vue({
    // 注册store
    store,
    // 注册路由
    router,
    // 注册App组件
    components: {App},
    // 渲染App组件
    render: createElement => createElement(App)
    // 上树
}).$mount('#app');

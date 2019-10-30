import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// // 引入mint-ui
import MintUI from 'mint-ui';
// // 引入样式
import 'mint-ui/lib/style.css';
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 引入自定义插件 插件里封装了$http异步请求方法
import ickt_plugin from './ickt_plugin';
// 安装MintUI
Vue.use(MintUI);
// 安装自定义插件
Vue.use(ickt_plugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


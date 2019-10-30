import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// // 引入列表页面
// import List from './views/List.vue'
// // 引入详情页面
// import Detail from './views/Detail.vue'
// // 引入支付页面
// import Payment from './views/Payment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/list/:id',component: () => import('./views/List.vue')},
    {path: '/detail/:id',component: () => import('./views/Detail.vue')},
    {path: '/payment',component: () => import('./views/Payment.vue')},
    {path:'/newsList',component:() => import('./views/NewsList.vue')},
    {path: '*', name: 'home',component: Home}
  ]
})

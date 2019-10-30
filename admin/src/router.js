import Vue from 'vue';
// 引入路由
import Router from 'vue-router';
// 安装路由
Vue.use(Router);
// 引入Home组件
import Home from '@/views/Home';
// 引入默认组件
import Default from '@/views/Default';
// 引入其他组件
import createGoods from '@/views/Goods/CreateGoods';
import GoodsList from '@/views/Goods/GoodsList';
import EditGoods from '@/views/Goods/EditGoods';

import CreateUsers from '@/views/Users/CreateUsers';
import UsersList from '@/views/Users/UsersList';
import EditUsers from '@/views/Users/EditUsers';

import Ads from '@/views/FirstPage/Ads';
import Types from '@/views/FirstPage/Types';
import AdsList from '@/views/FirstPage/AdsList';
import EditAds from '@/views/FirstPage/EditAds';
import CreateTypes from '@/views/FirstPage/CreateTypes';
import SameType from '@/views/FirstPage/SameType';

import CreateNews from '@/views/News/CreateNews';
import NewsList from '@/views/News/NewsList';

let routes = [
    {
        path: '/',
        component: Home,
        // children:[
        //     // Goods模块
        //     {path: '/Goods/createGoods',component: () => import('@/views/Goods/CreateGoods')},
        //     {path: '/Goods/GoodsList/:page',component: () => import('@/views/Goods/GoodsList')},
        //     {path: '/Goods/EditGoods/:id',component: () => import('@/views/Goods/EditGoods')},
        //     // Users模块
        //     {path: '/Users/CreateUsers',component: () => import('@/views/Users/CreateUsers')},
        //     {path: '/Users/UsersList/:page',component: () => import('@/views/Users/UsersList')},
        //     {path: '/Users/EditUsers/:id',component: () => import('@/views/Users/EditUsers')},
        //     // FirstPage模块
        //     {path: '/FirstPage/Ads',component: () => import('@/views/FirstPage/Ads')},
        //     {path: '/FirstPage/Types',component: () => import('@/views/FirstPage/Types')},
        //     // 配置默认模块
        //     {path: '*',component:Default}
        // ]

       children:[
            // Goods模块
            {path: '/Goods/createGoods',component: createGoods},
            {path: '/Goods/GoodsList/:page',component: GoodsList},
            {path: '/Goods/EditGoods/:id',component: EditGoods},
            // Users模块
            {path: '/Users/CreateUsers',component: CreateUsers},
            {path: '/Users/UsersList/:page',component: UsersList},
            {path: '/Users/EditUsers/:id',component: EditUsers},
            // FirstPage模块
            {path: '/FirstPage/Ads',component: Ads},
            {path: '/FirstPage/Types',component: Types},
            {path:'/FirstPage/AdsList/:id',component:AdsList},
            {path:'/FirstPage/EditAds/:id',component: EditAds},
            {path:'/FirstPage/CreateTypes',component: CreateTypes},
            {path:'/FirstPage/SameType/:type/:page',component: SameType},
            {path:'/News/CreateNews',component: CreateNews},
            {path:'/News/NewsList/:page',component: NewsList},
            // 配置默认模块
            {path: '*',component:Default}
        ]

    }
]

// 创建实例化对象并暴露默认接口
export default new Router({routes});
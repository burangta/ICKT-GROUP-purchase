<template>
    <el-container class="page-home">
      <el-header>
        <h1 class="title">ICKT后台管理系统</h1>
        <div>
          您好
          <strong>{{$store.state.username}}</strong>
          欢迎回来!
          <a href="/admin/logout">退出</a>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu :router="true">
            <el-submenu v-for="(item,index) in menu" :index="String(index)" :key="index">
              <template #title>
                <i class="el-icon-menu"></i>
              <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="subitem in item.submenu" :key="subitem.url" :index="subitem.url">{{subitem.subTitle}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
              <!-- 确定子路由渲染位置 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
// 引入base.scss
@import "@/base.scss";
$whiteColor:#fff;
.page-home {
  .el-header {
    background: $whiteColor;
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-container {
    .el-aside {
            width: 20%;
      background: $whiteColor;
      margin-right: 10px;
    }
    .el-main {
      width:88%;
      background: $whiteColor;
      
    }
  }
  &,.el-container,.el-aside, .el-main {
    height: 100%;
  }

}


</style>

<script>
export default {
  data() {
    return {
      menu: [
        // 商品模块
        {
          title:'商品模块',
          submenu: [
            {subTitle: '创建商品',url:'/Goods/createGoods'},
            {subTitle: '商品列表',url:'/Goods/GoodsList/1'},
          ]
        },
         // 首页模块
        {
          title:'首页模块',
          submenu: [
            {subTitle: '首页广告',url:'/FirstPage/AdsList/1'},
            {subTitle: '首页分类',url:'/FirstPage/Types'},
          ]
        },
         // 用户模块
        {
          title:'用户模块',
          submenu: [
            {subTitle: '创建用户',url:'/Users/CreateUsers'},
            {subTitle: '用户列表',url:'/Users/UsersList/1'},
          ]
        },
        // 新闻模块
        {
          title: '新闻模块',
          submenu: [
            {subTitle: '创建新闻',url:'/News/CreateNews'},
            {subTitle: '新闻列表',url: '/News/NewsList/1'}
          ]
        }
      ]
    };
  }
};
</script>
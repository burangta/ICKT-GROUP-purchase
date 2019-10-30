<template>
  <div id="app">
     <!-- 头部 -->
      <Header>
          <div class="left_arrow" slot="left_arrow" @touchend="$router.go(-1)"></div>
          <!-- 点击时 跳转到列表页 所以使用router-link -->
          <template v-slot:linkTitle="childScope">
            <!-- 传递子组件的属性 通过v-slot接收 -->
            <router-link to="/list/1" tag="span">{{childScope.title}}</router-link>
          </template>        
        <div slot="right_login">登录</div>
      </Header>
    <keep-alive><router-view/></keep-alive>
    
  </div>
</template>

<style lang="scss">

// 引入header组件

</style>

<script>
// 引入header组件
import Header from '@/components/Header';
export default {
  // 注册header组件
  components: {Header}
}
</script>

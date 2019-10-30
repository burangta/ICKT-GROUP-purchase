<template>
    <div id="app">
        <!-- 确定路由的渲染位置  如果用户有登录 就渲染-->
        <router-view v-if="$store.state.username"></router-view>
        <!-- <router-view></router-view> -->
        <!-- 如果用户没有登录 就渲染登录界面 -->
        <Login v-else></Login>
    </div>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    html,body,#app {
        background: #efefef;
        height: 100%;
    }
    // $color:blue;
    // h1 {
    //     color: $color;
    // }
</style>
<script>
// 引入Login组件
import Login from '@/views/Login';
// 引入Home组件
import Home from '@/views/Home';
export default {
    // 注册Login 和 Home
    components: {Login,Home},
    data() {
        return {
            // title: 'ICKT后台管理系统'
        }
    },
    created() {
        this.$http.get('/admin/userinfo')
                .then(({data}) => {
                    // 发布同步消息 把用户名传递给store
                    console.log(data);
                    if(data.error === 0) {
                        this.$store.commit('updateUserInfo',data.data);
                    }
                })
    }
}
</script>
// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex,{ Store }from 'vuex';
// 安装vuex
Vue.use(Vuex);
// 引入axios
import axios from 'axios';

export default new Store({
    state: {
        // 定义用户名
        username: ''
    },
    mutations: {
        // 订阅updateUserInfo消息
        updateUserInfo(state,username) {
            // 更新用户名
            state.username = username;
        }
    },

    actions: {
        // 订阅sendUserInfo异步消息
        sendUserInfo(store,userInfo) {
            // 发送异步请求 携带用户名密码 验证用户名密码是否正确
            axios.post('/admin/login',{userInfo})
            .then(({data}) => {
                // console.log(data);
                // data的error为0时 再发布同步消息更新数据
                if(!data.error){
                    // 传递后端返回回来的用户名
                store.commit('updateUserInfo',data.data);
                // 如果错误码是7表示用户尚未登录 提示用户
                }else if(data.error === 6){
                    Vue.prototype.$message.error(data.errorText);
                }
            })
        }

    }
})

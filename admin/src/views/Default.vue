<template>
    <div class="default-page child-page">
        <h1>修改用户信息</h1>
        <el-form label-width="200px" :model="user" :rules="modifyUserInfo" ref="modifyUserInfo">
            <el-form-item label="用户名"  prop="username">
                <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="recheck">
                <el-input placeholder="请再次确认密码" v-model="user.recheck"  type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="submitModifiedUserInfo">提交</el-button>
                <el-button type="warning" @click="clearUserInfo">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss">
    .modifyTips {
        color: green;
        font-weight: bold;
        font-size: 18px;
    }
</style>

<script>
// 引入validator
import { checkUserName,checkPassword,reCheck} from '@/tools/validator';
export default {
    data() {
        return {
            user: {},
            modifyUserInfo:{
                // 校验用户名
                username:[{trigger:'blur',validator:checkUserName}],
                // 校验密码
                password:[{trigger:'blur',validator:checkPassword}],
                // 校验重复信息
                recheck:[{trigger:'blur',validator:(...args) => {
                    reCheck(this.user.password,'密码',...args)}}]
            },
        }
    },
    methods: {
        // 重置按钮事件
        clearUserInfo() {
            // 清空表单数据
            this.$refs.modifyUserInfo.resetFields();
        },
        // 提交按钮事件
        submitModifiedUserInfo() {
            // 验证表单数据是否合法
            this.$refs.modifyUserInfo.validate(result => {
                // 如果验证结果为true 就发送请求
                if(result) {
                    // 解构用户名密码
                    let { username,password } = this.user;
                    // 修改用户信息请求 携带用户名密码
                    this.$http.post('/admin/modifyUserInfo',{username,password})
                    .then(({data}) => {
                        // console.log(data);
                        // 如果成功 就刷新页面 跳转到登录页面
                        if(!data.error) {
                            // 提示用户修改成功
                            this.$message.info(data.data);
                            // 2秒后刷新页面
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        }
                        else {
                            this.$message.error(data.errorText);
                        }
                    } )
                }
            });
        }
    },
    created() {
        // console.log(this);
    }
}
</script>
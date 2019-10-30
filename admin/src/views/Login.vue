<template>
    <div class="page-login">
        <div class="login-form">
            <h1>请您登录</h1>
            <el-form label-width="100px" :model="user" :rules="loginRules" ref="login">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密  码" prop="password">
                    <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
                </el-form-item>
                <el-button type="success" @click="submitUserInfo">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    // 引入base.scss
    @import '@/base.scss';
    .page-login {
        position:fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        .login-form {
            width: 430px;
            background: #fff;
            padding: 15px;
            position: absolute;
            top:30%;
            left: 50%;
            transform: translate(-50%);
            border-radius: 10px;
            h1{
                font-weight: normal;
                font-size: 22px;
                text-align: center;
                border-bottom: solid 1.5px #ccc;
                padding: 10px 0;
            }
            .el-form {
                margin-top: 20px;
                .el-button {
                    width: 100%;
                }
            }
        }

    }
    
</style>

<script>
// 引入validator工具库 解构校验用户名 和 密码的方法
import { checkUserName,checkPassword } from '@/tools/validator';
// console.log(59,checkUserName);
export default {
    data() {
        return {
            // 定义存储用户名密码对象
           user: {},
        //    定义登录校验规则
        loginRules: {
            // 校验用户名规则
            username: [{trigger:'blur',validator:checkUserName}],
            // 校验密码规则
            password: [{trigger:'blur',validator:checkPassword}]
        }
        }
    },
    methods: {
        submitUserInfo() {
            // console.log(this.$refs);
            this.$refs.login.validate(result => {
                // result结果是布尔值 如果为真 说明用户名密码通过
                // 否则为false
                // 当为真是 发送异步请求
                if(result) {
                    this.$store.dispatch('sendUserInfo',this.user);               }
            })
        }
    }
}
</script>
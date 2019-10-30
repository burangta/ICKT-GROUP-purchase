<template>
  <div class="createUsers-page child-page">
    <h1>{{pageTitle}}</h1>
    <el-form :model="user" label-width="200px" :rules="createUserRules" ref="createUser">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input placeholder="请输入密码" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="电 话" prop="telnumber">
        <el-input placeholder="请输入输入电话号码" v-model="user.telnumber"></el-input>
      </el-form-item>
      <el-form-item label="性 别" prop="sex">
        <el-radio-group v-model="radio" label="性别">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简 介" prop="introduction">
        <el-input placeholder="请输入简介" v-model="user.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="createUser">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入校验方法
import {
  checkUserName,
  checkPassword,
  checkTelNumber,
  checkContentLength
} from "../../tools/validator";
export default {
  data() {
    return {
      // 定义页面标题
      pageTitle: "创建用户",
      // 定义提交地址
      submitURL: "/admin/createUser",
      // 定义绑定的数据对象user
      user: {},
      // 定义默认绑定的单选框的值
      radio: "2",
      // 定义校验规则
      createUserRules: {
        // 校验用户名
        username: [{ trigger: "blur", validator: checkUserName }],
        // 校验密码
        password: [{ trigger: "blur", validator: checkPassword }],
        // 校验手机号
        telnumber: [{ trigger: "blur", validator: checkTelNumber }],
        // 校验简介 不能超过130个字
        introduction: [{ trigger: "blur", validator: checkContentLength }]
      }
    };
  },
  computed: {
    //   处理user对象 把radio值添加上
    dealedUser() {
      this.user.radio = this.radio==1 ?'男' : '女';
      return this.user;
    }
  },
  methods: {
    // 点击提交按钮时执行createUser方法
    createUser() {
      // 校验表单内容是否合格
      this.$refs.createUser.validate(valid => {
        // 如果校验通过就发送数据
        if (valid) {
          console.log(this.dealedUser);
          // 发送请求 携带绑定的数据对象
          this.$http.post(this.submitURL, this.dealedUser).then(({ data }) => {
            //   如果失败 弹出失败提示信息
              if(data.error) {
                   return this.$message.error(data.errorText);
              }
            // 如果成功 弹出成功提示信息
             this.$message.info(data.successTips);
            // 一秒后跳转到用户列表页面
            setTimeout(() => {
                this.$router.replace('/Users/UsersList/1')
            }, 1000);
               
          });
        }
      });
    }
  }
};
</script>
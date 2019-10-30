<template>
  <div class="usersList-page child-page">
    <h1>用户列表</h1>
    <div class="user-list">
      <el-table :data="userList" border style="width: 80%">
        <el-table-column fixed prop="ID" label="用户ID" width="100" height="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100" height="80"></el-table-column>
        <el-table-column prop="radio" label="性别" width="80" height="80"></el-table-column>
        <el-table-column prop="password" label="密码" width="120" height="80"></el-table-column>
        <el-table-column prop="telnumber" label="电话" width="200" height="80"></el-table-column>
        <el-table-column prop="introduction" label="简介" width="200" height="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" height="80" type="index">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btns">
      <router-link :to="'/Users/UsersList/'+($route.params.page <2 ? 1 : $route.params.page -1)">
        <el-button round type="primary">&larr;上一页</el-button>
      </router-link>
      <router-link :to="'/Users/UsersList/'+(+$route.params.page + 1)">
        <el-button round type="primary">下一页&rarr;</el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.user-list {
  position: relative;
  margin-left: 120px;
}
.el-table .cell {
  height: 50px;
  line-height: 80px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.usersList-page {
  //   position: relative;
  .btns {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 57%;
    transform: translateX(-50%);
    .el-button {
      margin: 20px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      // 定义用户列表数组
      userList: []
    };
  },

  methods: {
    //   当点击编辑时 触发的事件
    handleClick(row) {
        //  跳转到编辑页面 并携带当前项的_id
    this.$router.push('/Users/EditUsers/' + row._id);
    },
    // 当点击删除时，触发的事件{
    handleClick1(row) {
        console.log(row._id);
        // 发送请求 删除当前项 携带_id
        this.$http.post('/admin/removeOneUser',{_id: row._id})
            .then(({data}) => {
                // console.log(data);
                // 如果出错 返回错误提示信息
                if(data.error) {
                    return this.$message.error(data.errorText);
                }
                // 如果成功，返回删除成功提示信息
                this.$message.info(data.successTips);
                // 1秒后刷新页面
                window.location.reload();
            })
    },
    // 定义获取对应用户列表数据的方法
    getUserList() {
      // 解构params
      let { params } = this.$route;
      // 发送获取用户列表数据请求 携带params中的page
      this.$http.get("/admin/getUserList", { params }).then(({ data }) => {
        // console.log(39, data);
        // 处理data.data
        // 获取当前页码并转为数字
        let pageNum = +this.$route.params.page;
        data.data.forEach((item, index) => {
          item.ID = index + 1 + 5 * (pageNum - 1);
        });
        // 更新数据
        this.userList = data.data;
      });
    }
  },
  // 组件创建时，获取用户列表数据
  created() {
    this.getUserList();
  },
  // 路由变化时，获取用户列表数据
  watch: {
    $route() {
      this.getUserList();
    }
  }
};
</script>
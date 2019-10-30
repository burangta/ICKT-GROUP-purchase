<template>
  <div class="child-page typeList">
    <h1>分类列表</h1>
    <div class="types">
      <div class="TList">
        <el-card  v-for="item in typeList" :key="item._id">
          <img :src="item.img" alt />
          <h2>{{item.name}}</h2>

          <div class="minibtn">
            <router-link :to="'/FirstPage/SameType/'+item.number+'/1'">
              <el-button type="primary" size="mini">查看同类商品</el-button>
            </router-link>
          </div>
        </el-card>
      </div>
    </div>
    <router-link to="CreateTypes">
      <el-button type="primary" class="createType">创建分类</el-button>
    </router-link>
  </div>
</template>
<style lang="scss">
.typeList {
  position: relative;
  .createType {
    position: absolute;
    top: 10px;
    right: 110px;
  }
  .TList {
      margin-left: 140px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width:80%;
      .el-card {
          text-align: center;
          width: 15%;
          height: 200px;
          margin-top: 20px;
          img {
              display:block;
              margin:auto;
              width: 100px;
              height: 100px;
              border: solid 3px #ccc;
            // background: #ccc;
              border-radius: 50%;
          }
          .minibtn {
              margin-left:-8px;
              margin-top:10px;
          }
      }
  }
}
</style>

<script>
export default {
    data() {
        return {
            typeList: []
        }
    },
  methods: {
    // 定义获取分类列表的方法
    getTypesList() {
      this.$http.get("/admin/getTypesList").then(({ data }) => {
        // console.log(data);
        // 更新数据
        this.typeList = data;
      });
    }
  },
  // 当组件创建完成 请求数据
  created() {
    this.getTypesList();
  },
  // 当路由发生改变 请求数据
  watch: {
    $route() {
      this.getTypesList();
    }
  }
};
</script>
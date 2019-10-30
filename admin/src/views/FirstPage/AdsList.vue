<template>
  <div class="AdsList child-page">
    <h1>广告列表</h1>
     <router-link to="/FirstPage/Ads" class="createAds"><el-button type="success">创建广告</el-button></router-link>
    <div class="cardList_container">
      <div class="cardList" v-for="item in AdsList" :key="item._id">
        <el-button>
          <img :src="item.img" alt />
          <h2 id="title">{{item.title}}</h2>
          <!-- <p class="pricetype"> -->
            <div class="subTitle">
              <i class="el-icon-star-off"></i>
              <a :href="'http://'+item.link1" type="success">{{item.subTitle1}}</a>
            </div>
            <div class="subTitle">
              <i class="el-icon-star-off"></i>
              <a :href="'http://'+item.link2" type="success">{{item.subTitle2}}</a>
            </div>
          <!-- </p> -->
          <div class="minibtn">
            <router-link :to="'/FirstPage/EditAds/'+item._id">
              <el-button type="success" size="mini">修改</el-button>
            </router-link>
            <el-button class="delete" type="primary" size="mini" @click="deleteOneAds(item._id)">删除</el-button>
          </div>
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
   #title {
        margin-bottom: -5px;
    }
    .subTitle,a {   
            text-align: left;
            margin:20px;
            font-size: 18px;
            color:skyblue;
    }
    .AdsList {
    position: relative;
    .createAds {
    position: absolute;
    top:0;
    right:143px;
}
    }
</style>
<script>
export default {
  data() {
    return {
      // 定义广告列表
      AdsList: []
    };
  },
  methods: {
    // 删除一条广告
    deleteOneAds(id) {
      this.$http.post("/admin/deleteOneAds", { id }).then(({ data }) => {
        if (!data.error) {
          // 返回删除成功提示
          this.$message.error(data.successTips);
          // 一秒后重新刷新页面
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    },
    // 定义获取广告列表方法
    getAdsList() {
      // 解构params
      let { params } = this.$route;
      // 发送请求 携带id
      this.$http.get("/admin/getAdsList", { params }).then(({ data }) => {
        console.log(data);
        if (!data.error) {
          // 更新数据
          this.AdsList = data.data;
        }
      });
    }
  },
  created() {
    // 创建后获取数据
    this.getAdsList();
  },
  watch: {
    // 路由变化时获取数据
    $route() {
      this.getAdsList();
    }
  }
};
</script>
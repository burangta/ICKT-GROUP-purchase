<template>
  <div class="goodsList child-page">
    <h1>{{pageTitle}}</h1>
    <div class="cardList_container">
      <div class="cardList" v-for="item in goodsList" :key="item._id">
        <el-button>
          <img :src="item.img" alt />
          <h2>{{item.title}}</h2>
          <p class="pricetype">
            <span class="price">￥{{item.price}}</span>
            <span class="type">{{getType(item.type)}}</span>
          </p>
          <span class="sales">已售{{item.sales}}</span>
          <div class="minibtn">
            <router-link :to="'/Goods/EditGoods/'+item._id">
              <el-button type="success" size="mini">修改</el-button>
            </router-link>
            <el-button
              class="delete"
              type="primary"
              size="mini"
              @click="deleteOneGoods(item._id)"
            >删除</el-button>
          </div>
        </el-button>
      </div>
    </div>
    <div class="btns">
      <!-- <router-link :to="'/Goods/GoodsList/'+($route.params.page <2 ? 1 : $route.params.page -1)">
        <el-button round type="primary">&larr;上一页</el-button>
      </router-link>
      <router-link :to="'/Goods/GoodsList/'+(+$route.params.page + 1)">
        <el-button round type="primary">下一页&rarr;</el-button>
      </router-link>-->
      <el-button round type="primary" @click="toPrePage">&larr;上一页</el-button>
      <el-button round type="primary" @click="toNextPage">下一页&rarr;</el-button>
    </div>
  </div>
</template>

<style lang="scss">
// 引入base.scss
@import "@/base.scss";
.cardList_container {
  width: 1266px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .cardList {
    padding: 20px;
    img {
      display: block;
      margin: auto;
      border: solid 2px yellow;
      width: 200px;
      height: 200px;
    }

    h2 {
      font-size: 18px;
      width: 300px;
      text-align: center;
      margin: 20px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .pricetype {
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 18px;
        color: red;
      }
      .type {
        width: 200px;
        font-weight: bold;
        color: skyblue;
      }
    }

    .sales {
      display: block;
      font-size: 16px;
      margin: 15px 0;
      text-align: left;
    }
    .minibtn {
      text-align: left;
      margin-right: 50px;
    }
  }
}

.btns {
  text-align: center;
  .delete {
    margin-left: 50px;
  }
}
</style>

<script>
let GoodsTypes = [
  { label: "喵生鲜", id: 1 },
  { label: "魅力惠", id: 2 },
  { label: "益智玩具", id: 3 },
  { label: "生活服务", id: 4 },
  { label: "居家", id: 5 },
  { label: "在线课程", id: 6 },
  { label: "飞猪旅行", id: 7 },
  { label: "电子产品", id: 8 },
  { label: "美妆", id: 9 },
  { label: "食品", id: 10 }
];

export default {
  data() {
    return {
      // 定义商品列表数据
      goodsList: [],
      // 定义网页标题
      pageTitle: "商品列表",
      // 定义请求商品列表时发送请求地址
      submitURL: "/admin/getGoodsList"
    };
  },
  methods: {
    // 上一页事件
    toPrePage() {
      this.$router.push(
        "/Goods/GoodsList/" +
          (this.$route.params.page < 2 ? 1 : this.$route.params.page - 1)
      );
    },
    // 下一页事件
    toNextPage() {
      this.$router.push("/Goods/GoodsList/" + (+this.$route.params.page + 1));
    },
    // 定义请求商品列表数据方法
    getGoodsList() {
      // 解构params
      let { params } = this.$route;
      this.$http.get(this.submitURL, { params }).then(({ data }) => {
        // console.log(data);
        // 如果错误码为0
        if (!data.error) {
          // 存储数据 更新商品列表
          this.goodsList = data.data;
        } else {
          // 否则 提示用户对应错误
          this.$message.error(data.errorText);
        }
      });
    },
    // 定义获取分类方法
    getType(id) {
      let type = GoodsTypes.find(item => {
        return item.id == id;
      });
      // 如果存在 就返回对应的分类 如果不存在 就返回默认字符 其他分类
      return type ? type.label : "其他分类";
    },
    // 删除一个商品
    deleteOneGoods(id) {
      // 发送请求 携带该商品的_id
      this.$http.post("/admin/deleteOneGoods", { id }).then(({ data }) => {
        if (!data.error) {
          // 如果删除成功 返回成功提示给用户
          this.$message.error(data.successTips);
          // 1秒后刷新页面
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // 如果删除失败 或者 没有删除 提示用户
          this.$message.error(data.errorText);
        }
      });
    }
  },
  // 当组件创建完成 请求数据
  created() {
    this.getGoodsList();
  },
  // 当路由发生改变 请求数据
  watch: {
    $route() {
      this.getGoodsList();
    }
  }
};
</script>
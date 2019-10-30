<template>
  <div class="Product_detail">
    <div class="top">
      <img :src="productDetail.img" alt />
      <h3>{{productDetail.title}}</h3>
      <span>{{productDetail.description}}</span>
    </div>
    <div class="price_box">
      <span>{{productDetail.price}}元</span>
      <span>门市价:{{productDetail.originPrice}}元</span>
      <!-- 点立即购买 把商品放入商品数组中 -->
      <span
        @touchend="putInCart"
        :class="{'buyNow':true,'cancelBuy':hasBuy}"
      >{{hasBuy?'取消购买':'立即购买'}}</span>
    </div>
    <div class="cancelProduct">
      <span>支持立即退货</span>
      <span>支持立即退货</span>
      <span>销量{{productDetail.sales}}</span>
    </div>
    <div class="merchants">
      <p>店家信息</p>
      <div>
        <p>{{productDetail.storeName}}</p>
        <p>{{productDetail.storeAddress}}</p>
      </div>
      <span>查看其他{{productDetail.storeNum}}家分店</span>
    </div>
    <div class="notes">
      <h2>购买须知</h2>
      <div v-html="productDetail.content"></div>
    </div>
    <div class="done">
      <!-- <p>共￥{{totalPrice}}元</p> -->
      <p>共￥{{$store.getters.finnalPrice}}</p>

      <!-- <router-link tag="span" to="/payment"><div @touchend="submitOrder">选好了</div></router-link> -->
      <span @touchend="submitOrder">选好了</span>
    </div>
  </div>
</template>


<style lang="scss">
// 引入base.scss
@import "@/base.scss";
body {
  background: #efefef;
}
.Product_detail {
  // 上部
  .top {
    position: relative;
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
    h3,
    span {
      position: absolute;
      bottom: 40px;
      color: #fff;
      font-size: 25px;
    }
    span {
      font-size: 14px;
      bottom: 15px;
    }
  }
  // 价格
  .price_box {
    position: relative;
    background: #fff;
    padding: 10px;
    span:first-child {
      color: $greenColor;
      font-size: 30px;
      margin-right: 10px;
    }
    .buyNow {
      display: inline-block;
      width: 70px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-radius: 5px;
      background: red;
      color: #fff;
      font-size: 12px;
      position: absolute;
      right: 12px;
      top: 18px;
      &.cancelBuy {
        background: #efefef;
        color: #555;
      }
    }
  }
  //   支持退货
  .cancelProduct {
    background: #fff;
    border-top: 1px solid #ccc;
    padding: 15px 10px;
    span {
      display: inline-block;
      margin-right: 100px;
      color: #a3d900;
      &:last-child {
        color: black;
        font-size: 14px;
      }
    }
  }
  //   店家信息
  .merchants {
    margin-top: 10px;
    background: #fff;
    padding: 12px 20px 10px 10px;
    p {
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    div {
      p {
        padding-bottom: 0;
        line-height: 30px;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
      }
    }
    span {
      color: skyblue;
      font-size: 12px;
    }
  }
  // 购买须知
  .notes {
    background: #fff;
    margin-top: 10px;
    padding: 12px 20px 10px 10px;
    h2 {
      font-weight: normal;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    div {
      h3 {
        color: #ff8000;
        font-weight: normal;
        margin: 20px 0 10px;
      }
      p {
        line-height: 30px;
      }
    }
  }
  @mixin orderDone($w, $c) {
    display: inline-block;
    width: $w;
    background: $c;
    color: #fff;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
  // 选好了
  .done {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 50px;
    p {
      @include orderDone(70%, #484d54);
    }
    span {
      @include orderDone(30%, #fe2947);
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      // 定义商品详情对象
      productDetail: {},
      // 是否点击了立即购买
      hasBuy: false
    };
  },
  methods: {
    //   立即购买就是放入购物车事件
    putInCart() {
      // 发布消息
      this.$store.commit(
        this.hasBuy ? "cancelBuy" : "buyNow",
        this.productDetail
      );
      // 改变hasBuy的值
      this.hasBuy = !this.hasBuy;
    },
    // 选好了 提交订单
    submitOrder() {
      if (!this.$store.state.cartProducts.length) {
        return alert("请选择商品哦");
      }
      // 如果选择了商品 就跳转页面
      this.$router.push("/payment");
    },
    // 封装获取商品详情方法
    getGoodsDetail() {
      let { params } = this.$route;
      console.log(218,params);
      this.$http.get("/data/product", { params }).then(({ data }) => {
        // console.log(12, data);
        if (!data.error) {
          // 更新商品详情对象
          this.productDetail = data.data;
        }
        else{
          // this.$message.error(data.errorText);
           this.productDetail = {};
        }
      });
    }
  },
  created() {
    this.getGoodsDetail();
  },
  // 当路由变化时 也要获取数据
  watch: {
    $route() {
      this.getGoodsDetail();
    }
  }
};
</script>
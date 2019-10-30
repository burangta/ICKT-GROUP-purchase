<template>
  <router-link class="goods_outter" tag="div" :to="'/detail/'+listData._id">
    <div class="goods">
      <img :src="listData.img" alt />
      <div>
        <h2>{{listData.title}}</h2>
        <p>
          <span>{{listData.price}}元</span>
          <span>门市价：{{listData.originPrice}}元</span>
          <span>销量{{listData.sales}}</span>
        </p>
      </div>
    </div>
  </router-link>
</template>
<style lang="scss">
// 引入scss文件
@import "@/base.scss";
.goods_outter {
  background: #fff;
  padding: 10px;
  .goods {
    border-bottom: solid 1px #ccc;
    display: flex;
    img {
        margin-right: 10px;
      width: 100px;
      height: 65.5px;
    }
    div {
        flex: 1;
        h2 {
            font-size: 16px;
            margin-bottom: 22px;
        }
        p {
            width: 100%;
            font-size: 14px;
            span:first-child{
               color: $greenColor;
               margin-right: 10px;
            }
            span:last-child {
                float: right;
            }
        }
    }
    
  }
}
</style>
<script>
export default {
  // 接收父组件传递过来的数据
  props: ["listData"]
};
</script>


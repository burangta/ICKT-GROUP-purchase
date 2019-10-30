<template>
  <div class="home">
    <!-- 同步数据商品分类部分 -->
    <ul class="categories">
      <router-link tag="li" v-for="item in categories" :key="item.id" :to="'list/'+item.number">
          <img :src="item.img" class="all-types" alt="">
          <p>{{item.name}}</p>
      </router-link>
    </ul>

  <!-- 广告部分 -->
  <!-- <ul class="advs">
    <router-link to="" v-for="(item,index) in ads" :key="item._id" tag="li">
      <h2 :class="'color_'+index" >{{item.title}}</h2>
      <router-link tag="p" :to="item.link1.split('#').pop()"><p>{{item.subTitle1}}</p></router-link>
      <router-link tag="p" :to="item.link2.split('#').pop()"> <p>{{item.subTitle2}}</p></router-link>
     
      <img :src="item.img" alt="">
    </router-link>
  </ul> -->

  <!-- <ul class="advs">
    <router-link :to="item.link1.split('#').pop()" v-for="(item,index) in ads" :key="item._id" tag="li">
      <h2 :class="'color_'+index" >{{item.title}}</h2> 
      <img :src="item.img" alt="">
    </router-link>
  </ul> -->

<!-- 广告部分 -->
<mt-swipe :auto="2000">
  <mt-swipe-item  v-for="(item,index) in ads" :key="item._id" class="swipe">
    <router-link :to="item.link1.split('#').pop()" tag="li" class="oneAds">
      <h1>{{item.title}}</h1> 
      <img :src="item.img" alt="">
    </router-link>
  </mt-swipe-item>
</mt-swipe>


<!-- 查看新闻 -->
<router-link to="/newsList" tag="h3" class="check-news">查看新闻</router-link>
    <!-- 猜你喜欢 -->
    <div class="guess"><p>猜你喜欢</p></div>
    <!-- 猜你喜欢的商品列表 -->
    <Commodity v-for="item in list" :key="item._id" :list-data="item"></Commodity>
  </div>
</template>

<style lang="scss">
  // 引入base.scss
  @import '@/base.scss';
  body {
    background: #ccc;
  }
  .categories {
    display:flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 20px 0 10px;
    li {
      margin-top: 10px;
      text-align: center;
      width:(100% / 5);
      height: 85px;
      position: relative;
      img{
        display: block;
        margin: auto;
        width: 60%;
        height: 60%;
        border-radius: 50%;
        border: solid 2px #ccc;
      }
      h2 {
        position: absolute;
        bottom:20px;
      }
      p {
        margin-top: 5px;
      }
    }
  }
  // 广告部分
  .advs {
    margin-top: 10px;
    display:flex;
    background: #fff;
    padding:15px 0;
    li{
      width: (100% / 3);
      text-align: center;
      border-right: #ccc 1px solid;
      &:last-child {
        border:none;
      }
      img {
        width:80%;
        height: 80%;
        display: block;
        margin: auto;
        border-radius: 10px;
        
      }
      h2 {
        font-size: 20px;
        font-weight: normal;
      }
      p {
        margin:10px 0 15px;
      }
    }
  }


.swipe {
  position: relative;
  h1 {
    position: absolute;
    top:20%;
    left: 55%;
    transform: translate(-50%,-50%);
    color: white;
    &:last-of-type {
      width: 400px;
      margin-left: 150px;
    }
  }

}
// .swipe h1:last-of-type {width: 400px};
  .check-news {
    background: #fff;
    padding: 10px;
    color: skyblue;
    margin-top: 10px;
  }
  $i:0;
  @each $c in red,green,purple {
    .color_#{$i} {
      color: $c;
    }
    $i: $i + 1;
  }
  // 猜你喜欢
  .guess {
    background: #fff;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    p {
      margin: 0 10px;
      border-bottom: solid 1px #ccc;
      font-size: 20px;
    }
  }
  .mint-swipe {
    height: 150px;
  }

</style>

<script>
// 引入Commodity组件
import Commodity from '@/components/Commodity';

export default {
  // 注册Commodity组件
  components: {Commodity},
  data() {
    return {
      // 商品分类
            categories:[],
            // 初始化ad
            ads: [],
            // 初始化list
            list: []
    }
  },
  // 组件创建完成后 发送异步请求 请求数据
  created() {
    // 获取商品列表
    this.$http.get('/data/home')
        .then (({data}) => {
          this.ads = data.ad;
          this.list = data.list;
          this.categories = data.categories;
        })
  }

}
</script>

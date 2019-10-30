<template>
  <div class="news-container">
    <div class="news-item" v-for="(item,index) in newsList" :key="index">
      <h2 @click="showNews(index)" :style="{background: isShow[index]}">{{item.title}}</h2>
      <ul class="child-news" v-show="isShow[index]">
        <li>
          <a :href="'http://'+item.link1" v-show="item.subTitle1">{{item.subTitle1}}</a>
        </li>
        <li>
          <a :href="'http://'+item.link1" v-show="item.subTitle1">{{item.subTitle2}}</a>
        </li>
        <li>
          <a :href="'http://'+item.link1" v-show="item.subTitle1">{{item.subTitle3}}</a>
        </li>
        <li>
          <a :href="'http://'+item.link1" v-show="item.subTitle1">{{item.subTitle4}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
.news-container {
  // padding: 10px;
  background-color: #efefef;
  display: flex;
  .news-item {
    width: 25%;
    height:40px;
    box-sizing: border-box;
    border-right: 1px #ccc solid;
    h2 {
      line-height: 40px;
      color: #ccc;
      font-size: 18px;
      text-align: center;
      width:100%;
      height: 100%;
    }
    .child-news {
      position: fixed;
      top: 90px;
      left: 0;
      width: 370%;
      padding: 10px;
      border: solid 1px #ccc;
      border-radius: 5px;
      background: lightskyblue;
      li {
        margin: 20px 0;
      }
      li > a {
        color: #fff;
        font-weight: bold;
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      newsList: [],
      isShow: ['yellow',0,0,0]
    };
  },
  methods: {
    showNews(index) {
      this.isShow = [];
      this.isShow[index] = 'yellow';
    }
  },
  // 页面一加载就要请求新闻列表数据
  created() {
    this.$http.get("/data/getNewsList").then(({ data }) => {
      console.log(data);
      // 更新数据
      this.newsList = data;
      console.log(this.newsList);
    });
  }
};
</script>
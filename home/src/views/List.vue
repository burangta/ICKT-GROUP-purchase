<template>
  <div>
    <!-- 使用Search组件 -->
    <Search v-model="title" placeholder="请输入搜索词" :sendSearchWord="receiveSearchWord"></Search>
    <!-- 排序按钮部分 -->
    <ul class="reorder">
      <li v-for="item in reorder" :key="item.id">
        <span class="title">{{item.title}}</span>
        <span class="down_arrow" @touchend="chooseSortWay(item.id)"></span>
      </li>
      <div class="sort_way" v-show="touchedSortWay">
        <div class="sort_way_inner">
          <!-- 降序排序 -->
          <div @click="descendingSort">{{sortKeywords[0]}}</div>
          <!-- 升序排序 -->
          <div @click="ascendingSort">{{sortKeywords[1]}}</div>
        </div>
      </div>
    </ul>
    <!-- 商品列表部分 -->
    <ul class="goods_list">
   <router-link
        class="goods_outter"
        tag="li"
        :to="'/detail/'+ item._id"
        v-for="item in Corresponding_goods"
        :key="item._id"
      >
        <div class="goods">
          <img :src="item.img" alt />
          <div>
            <h2>{{item.title}}</h2>
            <p>
              <span>{{item.price}}元</span>
              <span>门市价：{{item.originPrice}}元</span>
              <span>销量{{item.sales}}</span>
            </p>
          </div>
        </div>
      </router-link>      
    </ul>
    <!-- 使用组件有问题 不知道啥原因 -->
    <!-- <Commodity v-for="item in Corresponding_goods" :key="item._id" :list-data="item"></Commodity> -->
    <p class="hidden_goods" v-show="hidden_goods.length" @touchend="showHiddenGoods">
      查看其他{{hidden_goods.length}}条数据
      <span></span>
    </p>
  </div>
</template>

// 样式
<style lang="scss">
// 引入base.scss文件
@import "@/base.scss";
body {
  background: #efefef;
}
.reorder {
  position: relative;
  display: flex;
  background: #fff;
  font-size: 13px;
  li {
    width: (100% / 4);
    height: 30px;
    text-align: center;
    border-right: 1px solid #ccc;
    &:last-child {
      border: none;
    }
    .down_arrow {
      position: relative;
      &::before,
      &::after {
        @include trangleArrow(5px, black, top);
        content: "";
        position: absolute;
        top: 8px;
        left: 4px;
      }
      &::after {
        @include trangleArrow(5px, white, top);
        top: 3px;
      }
    }
  }
  // 排序方式隐藏盒子
  .sort_way {
    width: 100%;
    border: solid 1px #ccc;
    color: $greenColor;
    position: absolute;
    top: 20px;
    left: 0;
    background-color: #fff;
    .sort_way_inner {
      width: 80%;
      margin: auto;
      div {
        border-radius: 5px;
        margin: 10px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        background-color: #ccc;
        &:hover {
          background: #333;
        }
      }
    }
  }
}
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
        span:first-child {
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
// 查看其他x条数据按钮
.hidden_goods {
  margin-left: -12px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #ccc;
  color: $greenColor;
  font-size: 18px;
  span {
    position: relative;
    &::before,
    &::after {
      @include trangleArrow(9px, $greenColor, top);
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
    }
    &:after {
      @include trangleArrow(9px, white, top);
      top: 6px;
    }
  }
}
</style>

<script>
// 引入Search组件
import Search from "@/components/Search.vue";
// 引入Commodity组件
import Commodity from "@/components/Search.vue";

export default {
  // 注册Search Commodity组件
  components: { Search,Commodity },
  data() {
    return {
      title: "list页面",
      // 定义搜索词
      fakeSearchWord: "",
      // 定义排序按钮数组
      reorder: [
        { id: "price", title: "价格排序" },
        { id: "sales", title: "销量排序" },
        { id: "evaluate", title: "好评排序" },
        { id: "discount", title: "优惠排序" }
      ],
      // 定义对应分类下列表页商品数据(默认只显示三个)
      Corresponding_goods: [],
      //   隐藏的其他商品
      hidden_goods: [],
      //   所有商品列表
      allGoodsList: [],
      //   排序关键字
      sortKeywords: ["从高到低", "从低到高"],

      //   控制排序方式显隐
      touchedSortWay: false,
      // 哪个排序id
      sortId: ''
    };
  },
 
  methods: {
    // 接收子组件search传递过来的数据 就是搜索词
    receiveSearchWord(searchWord) {
      //    更新搜索词数据
      this.fakeSearchWord = searchWord;
       this.$http.get('/data/search',{

                params: {
                    // 携带哪个分类
                    type: this.$route.params.id,
                    // 携带搜索词
                    searchvalue: this.fakeSearchWord
                }
            }).then(({data}) => {
                // 11111111111111111111111111111更新数据 显示匹配到的商品数组
                    // 更新数据
          // 所有列表数组
          this.allGoodsList = data;
          // 显示列表
          this.Corresponding_goods = data.slice(0, 3);
          // 隐藏列表
          this.hidden_goods = data.slice(3);
                // this.Corresponding_goods = data;
                console.log(this.Corresponding_goods);
            })
    
      // 把搜索词更新到store中 方便其他组件共享
      this.$store.commit('updateSearchWord',searchWord);
    },



    // 定义获取请求回来的数据的方法
    getRequestData() {
      // 获取params参数对象
      let { params } = this.$route;
      // console.log('list247',params);
      this.$http
        .get("/data/list", { params })
        .then(({ data }) => {
          console.log(251,data);
          // 更新数据
          // 所有列表数组
          this.allGoodsList = data.data;
          // 显示列表
          this.Corresponding_goods = data.data.slice(0, 3);
          // 隐藏列表
          this.hidden_goods = data.data.slice(3);
          // console.log(this.Corresponding_goods);
        })
        .catch(err => console.log(err));
    },

// 定义获取排序后数据的方法
getSortData(sortway) {
    // 发送请求 获取数据库数据
      this.$http.get('/data/sort',{
        params: {
          // 携带分类的id
        type: this.$route.params.id,
        // 携带排序的id
        id: this.sortId,
        // 携带升序方式
        sort_way: sortway
        }
      }).then (({data}) => {
        // // 更新数据
        //   this.Corresponding_goods = data;
          console.log(278,data);
        //   // 如果是传的是descend 就降序排序
        //   if(sortway === 'descend') {
        //     // 如果sortID是discount 需要处理一下数据
        //     if(this.sortId === 'discount') {
        //       return this.Corresponding_goods.sort((a,b) => (b.originPrice-b.price) - (a.originPrice-a.price));
        //     }
        //     return this.Corresponding_goods.sort((a,b) => b[this.sortId] - a[this.sortId]);
        //   }
        //   // 否则就升序排序
        //   else {
        //     // 如果sortID是discount 需要处理一下数据
        //     if(this.sortId === 'discount') {
        //       return this.Corresponding_goods.sort((a,b) => ((a.originPrice-a.price) - b.originPrice-b.price));
        //     }
        //     return this.Corresponding_goods.sort((a,b) => a[this.sortId] - b[this.sortId]);
        //   }





        // 更新数据
        // 所有列表数组
          this.allGoodsList = data;
          // 可显示列表数组
          this.Corresponding_goods=this.allGoodsList
      });
},

    // 显示隐藏列表
    showHiddenGoods() {
      // 更新显示的列表数组
      this.Corresponding_goods = this.allGoodsList;
      // 清空隐藏数组
      this.hidden_goods = [];
    },



    // 选择排序方式
    chooseSortWay(id) {
      // 更新sortID 
      this.sortId = id;
      // 控制显隐
      this.touchedSortWay = !this.touchedSortWay;
      // 根据id切换内容
      if (id === "evaluate" || id === "sales") {
        this.sortKeywords = ["从多到少", "从少到多"];
      } else if (id === "discount") {
        this.sortKeywords = ["从大到小", "从小到大"];
      } else {
        this.sortKeywords = ["从高到低", "从低到高"];
      }
    },



    // 降序排序
    descendingSort() {
      // 发送请求 获取数据库数据
      this.getSortData('descend')
      this.touchedSortWay = false;
    },
    // 升序排序
    ascendingSort() {
     // 发送请求 获取数据库数据
      this.getSortData('ascend')
      this.touchedSortWay = false;
    }
  },


  created() {
    this.getRequestData();
  },
  // 当路由改变时，获取分类后列表
  watch: {
    $route(){
      this.getRequestData();
  },

}
}
</script>
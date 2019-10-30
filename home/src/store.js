import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义搜索词
    searchWord: '',
    // 定义搜索结果数组
    searchResultArr: [],
    // 定义订单商品数组
    cartProducts:[]

  },
  getters: {
    // 获取订单总价
    finnalPrice(state) {
      // 如果购物车没有商品 价格为0.00
      if(state.cartProducts.length === 0) {
        return '0.00';
      }
      // 如果有 累加价格并返回
      let totalprice = 0;
      state.cartProducts.forEach(item => totalprice += +item.price);
      return totalprice.toFixed(2);
    }
  },
  mutations: {
    // 订阅updateSearchWord 消息
    updateSearchWord(state,searchWord) {
      // 更新state中的searchWord
        state.searchWord = searchWord;
    },
    // 订阅sendSearchedList 消息
    sendSearchedResult(state,searchResultArr) {
      // 更新state中的searchWord
      state.searchResultArr = searchResultArr;
    },
    // updateCartProducts(state,orderObj) {
    //   // 更新购物车数组
    //   state.cartProducts = orderObj.cartProducts;
    //   // 更新订单总价
    //   state.totalPrice = orderObj.totalPrice;
    // },
    // 订阅立即购买消息
    buyNow(state,productDetail) {
      // 点击立即购买 
      // 先判断购物车数组中是否有次商品信息 
     let result = state.cartProducts.find((item) => {
       return item._id === productDetail._id;
     })
    //  如果存在 提示用户 
     if(result) {
       return alert('此商品已在购物车 请不要重复添加')
     }
    //  如果不存在 就把商品信息添加到购物车
      state.cartProducts.push(productDetail);
      // console.log(state.cartProducts);
    },
    // 订阅取消购买消息
    cancelBuy(state,productDetail) {
      // 先查找购物车中是否有此商品
      let index = state.cartProducts.findIndex((item) => {
        return item._id === productDetail._id;
      })
      // 如果没有 提示用户
      if(index < 0) {
        return alert('商品不存在');
      }
      // 点击取消购买
      // 如果有 对应的商品信息对象需要从state中的购物车数组中移除
      state.cartProducts.splice(index,1);
      // console.log(state.cartProducts);
    }
  },
  actions: {
    
  }
})


<script>
// 引入商品列表组件
import GoodsList from "@/views/Goods/GoodsList.vue";
export default {
  // 继承GoodsList
  mixins: [GoodsList],
  data() {
    return {
      // 定义网页标题
      pageTitle: "同类商品列表",
      // 定义请求商品列表时发送请求地址
      submitURL: "/admin/getSameTypeGoodsList"
    };
  },
methods: {
    // 重写上一页下一页事件
     // 上一页事件
    toPrePage() {
      this.$router.push(
        '/FirstPage/SameType/' + this.$route.params.type + '/' + 
          (this.$route.params.page < 2 ? 1 : this.$route.params.page - 1)
      );
    },
    // 下一页事件
    toNextPage() {
      this.$router.push( '/FirstPage/SameType/' + this.$route.params.type + '/' + (+this.$route.params.page + 1));
    },
}
};
</script>
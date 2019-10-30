<script>
// 引入CreateUsers.vue
import CreateUsers from "./CreateUsers";
export default {
  // 使用混合 继承CreateUsers
  mixins: [CreateUsers],
  data() {
    return {
      // 定义页面标题
      pageTitle: "编辑用户",
      // 定义提交地址
      submitURL: "/admin/updateUser"
    };
  },
  methods: {
    // 定义获取用户详情的方法
    getOneUserDetail() {
      // 解构param
      let { params } = this.$route;
      this.$http.get("/admin/getOneUserDetail", { params }).then(({ data }) => {
        // console.log(data.data);
        if (!data.error) {
          // 更新数据
          this.user = data.data;
          // 处理并更新radio
          this.radio = data.data.radio == "男" ? "1" : "2";
        }
      });
    }
  },
  // 组件创建成功后 就要请求用户详情数据 渲染到页面
  created() {
    this.getOneUserDetail();
  },
  // 当路由发生改变时，也要获取用户详情数据
  watch: {
    $route() {
      this.getOneUserDetail();
    }
  }
};
</script>
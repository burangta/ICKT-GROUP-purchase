<script>
// 引入CraterGoods.vue
import CraterGoods from '@/views/Goods/CreateGoods';
export default {
    // 使用混合技术集成CraterGoods
    mixins: [CraterGoods],
    data() {
        return {
            // 定义页面标题
            pageTitle:'编辑商品',
            // 定义更新商品的提交接口
            submitURL: '/admin/updateGoods',
            // 定义提交按钮标题
            submitTitle: '确认修改'
        }
    },
    methods: {
        // 定义请求商品详情数据方法
        getGoodsDetail() {
            // 解构params
            let { params } = this.$route;
            this.$http.get('/admin/getGoodsDetail',{params})
                .then(({data})=>{
                    // 如果成功 更新商品信息
                    if(!data.error) {
                        // 更新数据
                        this.goods = data.data;
                    }else{
                        // 如果失败 提示用户对应的错误提示
                        this.$message.error(data.errorText);
                    }
                });
        }
    },
    // 当组件创建完成 需要请求数据
    created() {
        this.getGoodsDetail();
    },
    // 当路由发生改变 也要请求数据 渲染页面
    watch: {
        $route() {
            this.getGoodsDetail();
        }
    }
}
</script>
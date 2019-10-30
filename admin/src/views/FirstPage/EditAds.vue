<script>
// 继承Ads组件
import Ads from './Ads.vue';
export default {
    mixins: [Ads],
    data() {
        return {
            // 定义页面标题
            pageTitle:'编辑广告',
            // 定义创建商品的提交接口
            submitURL: '/admin/updateAds',
            // 定义提交按钮标题
            submitTitle: '确认修改'
        }
    },
    methods: {
        // 定义获取数据的方法
        getOneAdsDetail() {
            // 解构params
            let { params } = this.$route;
            // 发送请求
            this.$http.get('/admin/getOneAdsDetail',{params})
                .then(({data}) => {
                    console.log(24,data);
                    if(!data.error) {
                        this.ads = data.data;
                    }
                })
        }
    },
    // 当组件创建时，需要获取某一个广告详情
    created() {
        this.getOneAdsDetail();
    },
    // 当路由改变时，需要获取对应的广告详情
    watch: {
        $route() {
          this.getOneAdsDetail();  
        }
    }

}
</script>
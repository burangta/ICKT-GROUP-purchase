<template>
    <div class="payment">
        <p class="price">商品总价<span>￥{{$store.getters.finnalPrice}}</span></p>
        <!-- <p> -->
            <div class="btnOutter">
                <div class="btn"><button>取消购买</button><button>立即付款</button></div>
            </div>
        <!-- </p> -->
        <h3>购买商品</h3>
        <Commodity v-for="item in orderImformation" :key="item._id" :list-data="item"></Commodity>
    </div>
</template>

<style lang="scss">
    .payment {
        background: #fff;
        padding: 20px 15px;
        .price {
            span {
                font-size: 30px;
                color: red;
            }
        }
        .btnOutter {
            padding: 20px;
            position: relative;
            height: 30px;
             .btn {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            marigin: auto;
            button {
                padding: 3px 6px;
                // line-height: 20px;
                font-size: 12px;
                color: #fff;
                border-radius: 5px;
                backgroud: #ccc;
                border: none;
                outline: none;
                margin-right: 20px;
                &:last-child {
                    background: #f30;
                    
                }
            }
        }
        }
       
    }
</style>

<script>
// 引入Commodity组件
import Commodity from '@/components/Commodity.vue';
export default {
    // 注册Commodity组件
    components: {Commodity},
    data() {
        return {
            orderImformation:{}
        }
    },
    created() {
        this.orderImformation = this.$store.state.cartProducts;
        console.log(this.orderImformation);
    }
}
</script>
<template>
    <div class="createGoods-page child-page">
        <h1>{{pageTitle}}</h1>
        <el-form label-width="200px" :model="goods" :rules="goodsRules" ref="uploadGoods">
            <el-form-item label="商品标题" prop="title">
                <el-input placeholder="请输入商品标题" v-model="goods.title"></el-input>
            </el-form-item>
             <el-form-item label="商品描述" prop="description">
                <el-input placeholder="请输入商品描述" type="textarea" v-model="goods.description"></el-input>
            </el-form-item>
             <el-form-item label="商品价格" prop="price">
                <el-input type="number" v-model="goods.price"></el-input>
            </el-form-item>
             <el-form-item label="商品原价" prop="originPrice">
                <el-input type="number" v-model="goods.originPrice"></el-input>
            </el-form-item>
             <el-form-item label="商品评分" prop="evaluate">
                <el-rate allow-half  show-score v-model="goods.evaluate"></el-rate>
            </el-form-item>
             <el-form-item label="商品分类" prop="type">
                <el-select placeholder="请输入商品分类" v-model="goods.type">
                    <el-option v-for="item in GoodsTypes" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="商品销量" prop="sales">
                <el-input type="number" v-model="goods.sales"></el-input>
            </el-form-item>
             <el-form-item label="商品店名" prop="storeName">
                <el-input placeholder="请输入商品店名" v-model="goods.storeName"></el-input>
            </el-form-item>
             <el-form-item label="商品地址" prop="storeAddress">
                <el-input placeholder="请输入商品地址" v-model="goods.storeAddress"></el-input>
            </el-form-item>
             <el-form-item label="商品分店" prop="storeNum">
                <el-input v-model="goods.storeNum"></el-input>
            </el-form-item>
             <el-form-item label="商品图片" prop="img">
                <el-upload 
                action="/admin/uploadImg"
                :on-success="imgUploadSuccess"
                :on-error="imgUploadError"
                >
                    <el-button type="primary">上传</el-button>
                    <span class="upload-tips">请选择商品图片</span>
                </el-upload>
                <img class="upload-img" alt="" :src="goods.img" v-if="goods.img">
            </el-form-item>
             <el-form-item label="商品内容" prop="content">
                <quill-editor v-model="goods.content"></quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button @click="createGoods" type="primaryy">{{submitTitle}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss">
    @import '@/base.scss';
    .upload-img {
        width: 200px;
        margin-top: 10px;
        border: solid 2px gray;
    }
</style>

<script>
let GoodsTypes = [
    { label: "喵生鲜", id: 1 },
  { label: "魅力惠", id: 2 },
  { label: "益智玩具", id: 3 },
  { label: "生活服务", id: 4 },
  { label: "居家", id: 5 },
  { label: "在线课程", id: 6 },
  { label: "飞猪旅行", id: 7 },
  { label: "电子产品", id: 8 },
  { label: "美妆", id: 9 },
  { label: "食品", id: 10 }
];
// 处理goods
let goods = {
    img: '',
    title:'',
    description: '',
    sales: 0,
    price: 0,
    originPrice: 0,
    evaluate: 0,
    storeNum: 0,
    storeName: '',
    storeAddress: '',
    content: '',
    type: ''
};


// 处理goodsRules
// 解构checkRequired方法
import { checkRequired } from '@/tools/validator';
let goodsRules = {};
for(let key in goods) {
    goodsRules[key] = [{trigger: 'blur',validator: checkRequired}];
}

export default {
    data() {
        return {
            // 定义商品分类
            GoodsTypes,
            // 定义绑定数据的对象
            goods,
            // 定义校验规则 每一个选项都是必填的
            goodsRules,
            // 定义页面标题
            pageTitle:'创建商品',
            // 定义创建商品的提交接口
            submitURL: '/admin/createGoods',
            // 定义提交按钮标题
            submitTitle: '确认创建'
        }
    },
    computed: {
        dealGoods() {
            // 对价格 原价 分店数量 评分 销量的输入字符串字段转化为数字处理
            ['price','originPrice','storeNum','sales','evaluate'].forEach(item => {
                this.goods[item] = +this.goods[item]
            })
            return this.goods;
        }
    },
    methods: {
        // 上传成功
        // 第一个参数是后端返回的数据对象 
        imgUploadSuccess(data) {
            // console.log('图片上传成功啦',data);
            // console.log(arguments);
            if(!data.error) {
                // 存储图片数据
                this.goods.img = data.data;
            }else {
                // 提示用户 
                this.$message.error(data.errorText);
            }
        },
        // 上传失败
        imgUploadError(data) {
           if(data.error) {
               this.$message.error(data.errorText);
           }
        },
        // 创建商品提交数据
        createGoods() {
            // 校验每一项是否合格
            this.$refs.uploadGoods.validate((valid) => {
                // 如果校验通过 就发送数据
                if(valid) {
                    console.log(this.goods);
                    this.$http.post(this.submitURL,this.dealGoods)
                        .then(({data}) => {
                            console.log(161,data);
                            if(!data.error) {
                                // 提示用户商品创建成功 
                                this.$message.info(data.successTips);
                                // 存储数据到store
                                // this.goods = data.data;
                                // 逻辑后补上
                                // 1秒后跳转到列表页
                               return  setTimeout(() => {
                                   this.$router.replace('/Goods/GoodsList/1')
                               }, 1000);;
                            }
                        });
                }
            })
        }
    }
}
</script>
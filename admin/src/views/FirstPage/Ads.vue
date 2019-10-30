<template>
    <div class="createGoods-page child-page createAds-page">
        <h1>{{pageTitle}}</h1>
        <!-- <router-link to="/FirstPage/AdsList/1" class="checkAdsList"><el-button type="success">查看广告列表</el-button></router-link> -->
        <div class="ads">
            <el-form label-width="200px" :model="ads" :rules="adsRules" ref="uploadAds">
                <el-form-item label="广告主题" prop="title">
                    <el-input placeholder="请输入广告主题" v-model="ads.title"></el-input>
                </el-form-item>
                <el-form-item label="主题类型" prop="type">
                    <el-input placeholder="请输入主题类型" type="number" v-model="ads.type"></el-input>
                </el-form-item>

                <el-form-item label="主题子分类1" prop="subTitle1">
                    <el-input placeholder="请输入子分类" v-model="ads.subTitle1"></el-input>
                </el-form-item>
                <el-form-item label="进入网址" prop="link1">
                    <el-input placeholder="请输入对应网址"  type="url" v-model="ads.link1">
                         <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主题子分类2"  prop="subTitle2">
                    <el-input placeholder="请输入子分类" v-model="ads.subTitle2"></el-input>
                </el-form-item>
                <el-form-item label="进入网址"  prop="link2">
                    <el-input placeholder="请输入对应网址" type="url" v-model="ads.link2">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主题图片">
                     <el-upload 
                action="/admin/uploadImg"
                :on-success="imgUploadSuccess"
                :on-error="imgUploadError"
                >
                    <el-button type="primary">上传</el-button>
                    <span class="upload-tips">请选择主题图片</span>
                </el-upload>
                <img class="upload-img" alt="" :src="ads.img" v-if="ads.img">
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submitADS">{{submitTitle}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<style lang="scss">
      .upload-img {
    width: 200px;
    margin-top: 10px;
    border: solid 2px gray;
}
.createAds-page {
    position: relative;
    .checkAdsList {
    position: absolute;
    top:0;
    right:143px;
}
}

</style>
<script>
// 引入校验规则
import { checkRequired } from '@/tools/validator';
// 处理ads
let ads = {
    title: '',
    subTitle1: '',
    subTitle2: '',
    link1: '',
    link2: '',
    img: '',
    type: 0
}

let adsRules = {};
for(let key in ads) {
    adsRules[key] = [{trigger: 'blur',validator: checkRequired}]
}

export default {
    data() {
        return {
            // 定义绑定数据的对象
            ads,
            // 定义校验规则
            adsRules,
            // 定义页面标题
            pageTitle:'创建广告',
            // 定义创建商品的提交接口
            submitURL: '/admin/createADS',
            // 定义提交按钮标题
            submitTitle: '确认创建'
            
        }
    },
    computed: {
        dealAds() {
            // 将type变为数字 
            this.ads.type = +this.ads.type;
            // 并返回对象
            return this.ads;
        }
    },

    methods: {
        imgUploadSuccess(data) {
             if(!data.error) {
                // // 存储图片数据
                this.ads.img = data.data;
            }else {
                // 提示用户 
                // this.$message.error(data.errorText);
            }
        },
        imgUploadError() {

        },
        submitADS() {
            // 校验每一项是否合格
            this.$refs.uploadAds.validate(valid => {
                if(valid) {
                    this.$http.post(this.submitURL,this.dealAds)
                        .then(({data}) => {
                            // console.log(113,data);
                            if(!data.error) {
                                // 提示用户商品创建成功 
                                this.$message.info(data.successTips);
                                // 更新数据
                                this.ads = data.data;
                                // 一秒后跳转到广告列表页面
                               return  setTimeout(() => {
                                   this.$router.replace('/FirstPage/AdsList/1')
                               }, 1000);;
                            }

                            });
                }
            })
        }
    }
}
</script>
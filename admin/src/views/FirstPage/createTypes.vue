<template>
    <div class="types child-page">
        <div class="create-type">
            <h1>创建分类</h1>
            <el-form :model="types" :rules="typesRules" ref="addTypes" label-width="200px">
                <el-form-item label="分类名称" prop="name">
                    <el-input placeholder="请输入分类名称" v-model="types.name"></el-input>
                </el-form-item>
                <el-form-item label="分类型号" prop="number">
                    <el-input placeholder="请输入分类型号" v-model="types.number" type="number" max="10" min="0"></el-input>
                </el-form-item>
                 <el-form-item label="分类图片" prop="img">
                <el-upload 
                action="/admin/uploadImg"
                :on-success="imgUploadSuccess"
                :on-error="imgUploadError"
                >
                    <el-button type="primary">上传</el-button>
                    <span class="upload-tips">请选择分类图片</span>
                </el-upload>
                <img class="upload-img" alt="" :src="types.img" v-if="types.img">
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="createTypes">提交</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
// 解构checkRequired方法
import { checkRequired } from '@/tools/validator';
let typesRules = {};
let types = {name: '',img: '',number: 0}
for(let key in types) {
    typesRules[key] = [{trigger: 'blur',validator: checkRequired}];
}
export default {
    data() {
        return {
            types: {},
            typesRules
        }
    },
    // 处理types
    computed: {
        dealTypes() {
            // 型号转数值类型
            this.types.number = +this.types.number;
            return this.types;
        }
    },
    methods: {
        imgUploadSuccess(data) {
            console.log(data);
            // 更新数据
            this.types.img = data.data;
        },
        imgUploadError() {

        },
        // 创建分类事件
        createTypes() {
            this.$refs.addTypes.validate((valid) => {
                if(valid)  {
                    // 携带型号类型创建数据
                     this.$http.post('/admin/createTypes',this.dealTypes)    
                            .then(({data}) => {
                                // 出错弹出错误信息
                                if(data.error) {
                                   return this.$message.error(data.errorText)
                                }
                                // 否则弹出成功提示
                                this.$message.info(data.successTips);
                                // 1秒后跳转到分类列表页面
                                setTimeout(() =>{
                                    this.$router.replace('/FirstPage/Types');
                                },1000)
                            })
                }
            })
           
        }
    }
}
</script>
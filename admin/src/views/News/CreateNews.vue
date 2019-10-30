<template>
    <div class="createGoods-page child-page createNews-page">
        <h1>创建新闻</h1>
        <div class="ads">
            <el-form label-width="200px" :model="news" :rules="NewsRules" ref="createNews">
                <el-form-item label="新闻主题" prop="title">
                    <el-input placeholder="请输入新闻主题" v-model="news.title"></el-input>
                </el-form-item>
                <el-form-item label="主题子分类1" prop="subTitle1">
                    <el-input placeholder="请输入子分类" v-model="news.subTitle1"></el-input>
                </el-form-item>
                <el-form-item label="进入网址" prop="link1">
                    <el-input placeholder="请输入对应网址" type="url" v-model="news.link1">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主题子分类2" prop="subTitle2">
                    <el-input placeholder="请输入子分类" v-model="news.subTitle2"></el-input>
                </el-form-item>
                <el-form-item label="进入网址" prop="link2">
                    <el-input placeholder="请输入对应网址" type="url" v-model="news.link2">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主题子分类3" prop="subTitle3">
                    <el-input placeholder="请输入子分类" v-model="news.subTitle3"></el-input>
                </el-form-item>
                <el-form-item label="进入网址" prop="link3">
                    <el-input placeholder="请输入对应网址" type="url" v-model="news.link3">
                        <template slot="prepend" >Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主题子分类4" prop="subTitle4">
                    <el-input placeholder="请输入子分类" v-model="news.subTitle4"></el-input>
                </el-form-item>
                <el-form-item label="进入网址" prop="link4">
                    <el-input placeholder="请输入对应网址" type="url" v-model="news.link4">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submitNews">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    // 引入校验方法
    let {
        checkRequired
    } = require('../../tools/validator');
    // 定义news
    let news = {
        title: '',
        subTitle1: '',
        subTitle2: '',
        subTitle3: '',
        subTitle4: '',
        link1: '',
        link1: '',
        link1: '',
        link1: '',
        link1: ''
    }
    let NewsRules = {};
    // 处理NewsRules
    for (let i in news) {
        NewsRules[i] = [{
            trigger: 'blur',
            validator: checkRequired
        }];
    }
    export default {
        data() {
            return {
                NewsRules,
                news
            }
        },
        methods: {
            submitNews() {
                this.$refs.createNews.validate((valid) => {
                    if (valid) {
                        console.log(this.news);
                        this.$http.post('/admin/news/createNews', this.news)
                            .then(({
                                data
                            }) => {
                                console.log(data);
                                if (data.error) {
                                   return this.$message.error(data.errorText);
                                }
                                this.$message.info(data.successTips);
                                setTimeout(() => {
                                    this.$router.replace('/News/NewsList/1')
                                }, 1000);
                            })
                    }
                })

            }
        }
    }
</script>
<template>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item style="height: 400px;" v-for="(item,index) in newsList" :key="index">
            <div class="news">
                    <h1>{{item.title}}</h1>
                    <a  :href="'http://'+item.link1" v-show="item.subTitle1">{{item.subTitle1}}</a>
                    <a  :href="'http://'+item.link2" v-show="item.subTitle1">{{item.subTitle2}}</a>
                    <a  :href="'http://'+item.link3" v-show="item.subTitle1">{{item.subTitle3}}</a>
                    <a  :href="'http://'+item.link4" v-show="item.subTitle1">{{item.subTitle4}}</a>
                    
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
      
      <style lang="scss">
        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
        }
        
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
        
        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
        .el-carousel {
          height:400px;
          .el-carousel__container  {
          height: 100%;
        }
        }
     
        .el-carousel__item h1 {
          color: purple;
          font-size: 25px;
        }
        .el-carousel__item a {
            display: block;
            font-weight: bold;
            line-height: 60px;
            color: #fff;
            font-size: 20px;
          }

          .news {
            padding: 20px;
            box-sizing: border-box;
          }
      </style>

<script>
    export default {
      data() {
        return {
          // 定义新闻列表数据
          newsList: []
        }
      },
        methods: {
         
        },
        // 当组件创建完成 请求新闻列表数据
        created() {
          this.$http.get('/admin/getNewsList')
              .then(({data}) => {
                // 失败则返回对应的错误提示
                  if(data.error) {
                  return  this.$message.error(data.errorText);
                  }
                  // 成功则更新数据
                  this.newsList = data.data;
              })
        }
    }
</script>
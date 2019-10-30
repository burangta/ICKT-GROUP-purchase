// 解构Router
let { Router } = require('express');
// 引入操作数据库集合方法
let { collectionHandle } = require('../db');

module.exports = new Router()
    // 处理移动端首页路由
    .get('/',(req,res) => {
        // 操作集合
        collectionHandle('types',res,(colls,client) => {
            colls.find()
            .toArray((err,data) => {
                // 处理data
                let typeInfo = '';
                data.forEach(item => {
                typeInfo+=' type_name:'+item.name + 'type_img_src: ' + item.img;
                });
                
                res.render('home.html',{
                    // 把typeInfo返回
                    typeInfo
                });
            })
        })
        
    })
    // 处理后台管理首页路由
    .get('/admin',(req,res) => {
        res.render('admin.html');
    })
    

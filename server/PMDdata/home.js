// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../db');
// 引入过滤数组方法
let { filterArray } = require('../tools');
// 引入移动端商品默认显示数量常量
let { PMD_DEFAULT_SHOW_NUM } = require('../consts');
module.exports = (req,res,next) => {
    // // 操作集合
    // collectionHandle('goods',res,(colls,client) => {
    //     // 查询所有商品
    //     colls.find()
    //             // 倒序
    //             .sort({_id:-1})
    //             // 截取
    //             .limit(PMD_DEFAULT_SHOW_NUM)
    //             // 转为数组
    //             .toArray((err,data) => {
    //                 if(err) {
    //                     return end({list:[],errorText:'查询失败'},res,client);
    //                 }
    //                 if(data.length) {
    //                     return end ({list:data},res,client);
    //                 }
    //                 end({list:[],errorText: '无相关数据'})
    //             })
    // })

     // 初始化list和ad和categories
     let list = [];
     let ad = [];
     let categories = [];
    // 查找goods集合
    collectionHandle('goods',res,(colls,client) => {
        // 查询所有商品
        colls.find()
                // 倒序
                .sort({_id:-1})
                // 截取
                .limit(PMD_DEFAULT_SHOW_NUM)
                // 转为数组
                .toArray((err,data1) => {
                    if(err) {
                        return end({list:[],errorText:'查询失败'},res,client);
                    }
                    if(data1.length) {
                        // 把查找到的数据赋值给list
                        list = filterArray(data1,['img','title','sales','price','originPrice','_id']);
                    }
                    // end({list:[],errorText: '无相关数据'})
                })
    })

    // 查找advertisement集合
    collectionHandle('advertisement',res,(colls,client) => {
        // 查询所有商品
        colls.find()
                // 倒序
                .sort({_id:-1})
                // 截取
                .limit(PMD_DEFAULT_SHOW_NUM)
                // 转为数组
                .toArray((err,data2) => {
                    if(err) {
                        return end({list:[],errorText:'查询失败'},res,client);
                    }
                    if(data2.length) {
                        // 把查找到的数据赋值给ad
                        ad = data2;
                    }
                    // end({list:[],errorText: '无相关数据'})
                })
    })  

    // 查找advertisement集合
    collectionHandle('types',res,(colls,client) => {
        // 查询所有商品
        colls.find()
            //    转为数组
                .toArray((err,data3) => {
                    if(err) {
                        return end({categories:[],errorText:'查询失败'},res,client);
                    }
                    if(data3.length) {
                        // 把查找到的数据赋值给categories
                        categories = data3;
                        // 然后一起返回数据给前端
                        return end({list,ad,categories},res,client);
                    }
                    // end({list:[],errorText: '无相关数据'})
                })
    })  
}

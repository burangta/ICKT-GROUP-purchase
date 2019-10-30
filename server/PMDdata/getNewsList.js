// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../db');
// 引入移动端商品默认显示数量常量
let { PMD_DEFAULT_SHOW_NUM } = require('../consts');

module.exports = (req,res) => {
    collectionHandle('news',res,(colls,client) => {
        colls.find()
            // 倒序
            .sort({_id: -1})
            // 按照默认显示数量截取
            .limit(PMD_DEFAULT_SHOW_NUM)
            // 转数组
            .toArray((err,data) => {
                // 返回数据
                end(data,res,client);
            })
    })
}
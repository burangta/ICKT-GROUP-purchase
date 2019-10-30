// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../db');
// 引入商品默认显示数量常量
let { PMD_DEFAULT_SHOW_NUM } = require('../consts');

module.exports = (req,res) => {
    // 定义查询条件 跟句商品的type
    let condition = {};
    // 因为id是字符串 type是数字 所以需要对id做处理
    // if(req.query.id) {
        condition.type = +req.query.id;
    // }
    
    collectionHandle('goods',res,(colls,client) => {
        // 查询数据库
        colls.find(condition)
        // 倒序
            .sort({_id:-1})
            // 截取
            .limit(PMD_DEFAULT_SHOW_NUM)
            // 转数组
            .toArray((err,data) => {
                // console.log(15,data);
                // 因为前端的限制接收一个数组 所以不管是出错还是成功都返回一个数组
                if(err) {
                    return end({data: []},res,client)
                }
                if(data.length) {
                    return end({data: data},res,client)
                }

            })
    })
}
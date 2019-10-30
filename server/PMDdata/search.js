// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../db');
// 引入商品默认显示数量常量
let { PMD_DEFAULT_SHOW_NUM } = require('../consts');
module.exports = (req,res) => {
    // console.log(req.query);
    // 定义查询对象
    let condition = {};
    // 如果有携带类型
    if(+req.query.type) {
        // 查询条件包含类型和标题含有关键字字段
        condition.type = +req.query.type;
        condition.title = new RegExp(req.query.searchvalue,'i');
        // 查询匹配项
        collectionHandle('goods',res,(colls,client) => {
            colls.find(condition)
                // 倒序
                .sort({_id: -1})
                // 截取
                .limit(PMD_DEFAULT_SHOW_NUM)
                // 转数组
                .toArray((err,data) => {
                    // console.log(19,data);
                    // 直接返回数据
                    end(data,res,client);
                })
        })
    }
}
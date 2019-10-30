// 引入操作数据库方法
let { collectionHandle, end, ObjectId } = require('../../db');

module.exports = (req,res) => {
    collectionHandle('types',res,(colls,client) => {
        // 查询types集合
        colls.find()
                // 倒序
                .sort({_id: -1})
                // 转数组
                .toArray((err,data) => {
                    // 返回数据
                    end(data,res,client);
                })
    })
}
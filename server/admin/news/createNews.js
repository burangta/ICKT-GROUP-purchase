// 引入操作数据库方法
let { collectionHandle, end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // 操作集合
    collectionHandle('news',res,(colls,client) => {
        colls.insertOne(req.body,(err,data) => {
            // 如果出错 返回插入错误
            if(err) {
                return end('collectionInsertError',res,client);
            }
            // 成功返回成功提示
            if(data.result.n > 0) {
                return end({error: 0,successTips: '创建成功'},res,client);
            }
            // 否则返回没有插入数据错误
            end('collectionInsertNoData',res,client);
        })
    })
}
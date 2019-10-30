// 引入操作数据库方法
let { collectionHandle, end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // 操作集合
    collectionHandle('types',res,(colls,client) => {
        // 插入数据
        colls.insertOne(req.body,(err,data) => {
            console.log(data);
            console.log(req.body);
            // 出错返回插入错误
            if(err) {
                return end('collectionInsertError',res,client)
            }
            // 成功返回成功提示信息
            if(data.result.n > 0 ) {
                return end({error: 0,successTips: '分类创建成功'},res,client)
            }
            // 否则返回没有插入数据错误
            end('collectionInsertNoData',res,client)
        })
    })
}
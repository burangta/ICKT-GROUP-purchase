// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../../db');

module.exports = (req,res) => {
    // res.json({error: 0,data: req.body,successTips:'商品创建成功'});
    console.log(req.body);
    // console.log(ObjectId);
    // 存储到数据库
    collectionHandle('goods',res,(colls,client) => {
        colls.insertOne(req.body,(err,data) => {
            // console.log(err,data);
            // 出错返回插入数据库错误
            if(err) {
                return end('collectionInsertError',res,client);
            }
            // 有数据返回数据
            if(data.result.n > 0) {
                return end({error: 0,data: data,successTips:'商品创建成功'},res,client);
            }
            // 否则返回没有插入任何数据错误
            return end('collectionInsertNoData',res,client);
        })
    })

}
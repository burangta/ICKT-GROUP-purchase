// 引入数据库操作方法
let { collectionHandle,end,ObjectId} = require('../../db');

module.exports = (req,res) => {
    // res.json({error:0,data:'创建广告成功'});
    // 存储数据
    collectionHandle('advertisement',res,(colls,client) => {
        // 插入广告数据
        colls.insertOne(req.body,(err,data) => {
            console.log(10,data);
            // 出错返回插入数据错误
            if(err) {
                return end('collectionInsertError',res,client);
            }
            // 有数据返回数据
            if(data.result.n > 0) {
                return end({error: 0,data: data,successTips:'广告创建成功'},res,client);
            }
            // 否则返回没有插入数据错误
            end('collectionInsertNoData',res,client);
        })
    })
}
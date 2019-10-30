// 引入操作数据库方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    collectionHandle('advertisement',res,(colls,client) => {
        // 删除数据
        colls.removeOne({_id:ObjectId(req.body.id)},(err,data) => {
            // 出错返回删除错误
            if(err) {
                return end('collectionRemoveError',res,client);
            }
            // 成功返回提示信息
            if(data.result.n > 0) {
                return end({error:0,successTips: '该条广告已删除'},res,client)
            }
            // 否则返回没有删除任何数据错误
            end('collectionRemoveNoData',res,client);
        })
    })
}
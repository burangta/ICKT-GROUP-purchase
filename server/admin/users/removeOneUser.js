// 引入操作数据库方法
let { collectionHandle, end, ObjectId } = require('../../db');
module.exports = (req,res) => {
    // res.json('删除用户成功');
    console.log(req.body);
    // 操作集合
    collectionHandle('users',res,(colls,client) => {
        // 根据_id来删除对应项
        colls.removeOne({_id:ObjectId(req.body._id)},(err,data) => {
            // 出错返回删除错误
            if(err) {
                return end('collectionRemoveError',res,client);
            }
            // 成功返回成功提示信息
            if(data.result.n > 0) {
                return end({error: 0,successTips: '删除成功'},res,client);
            }
            // 否则返回没有删除数据错误
            end('collectionRemoveNoData',res,client);
        })
    })

}
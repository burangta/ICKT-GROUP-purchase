// 引入操作数据库方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // 备份_id
    let id = ObjectId(req.body._id);
    // 删除req.body.id
    delete req.body._id;
    // 操作集合
    collectionHandle('advertisement',res,(colls,client) => {
        // 更新集合
        colls.updateOne({_id:id},{$set:req.body},(err,data) => {
            // 出错返回更新错误
            if(err) {
                return end('collectionUpdateError',res,client);
            }
            // 成功返回成功提示
            if(data.result.n > 0) {
                return end({error: 0,successTips:'广告修改成功'},res,client);
            }
            // 否则返回没有更新任何数据错误
            end('collectionUpdateNoData',res,client);
        })
    })
}
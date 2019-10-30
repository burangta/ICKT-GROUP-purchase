// 引入操作数据库方法
let { collectionHandle, end, ObjectId } = require('../../db');

module.exports = (req,res) => {
    // 获取_id
    let id = ObjectId(req.body._id);
    // 处理req.body 删除_id属性
    delete req.body._id;
    // 操作集合
    collectionHandle('users',res,(colls,client) => {
        // 更新数据
        colls.updateOne({_id: id},{$set: req.body},(err,data) => {
            // 出错返回更新错误
            if(err) {
                return end('collectionUpdateError',res,client);
            }
            // 成功返回成功提示
            if(data.result.n > 0) {
                return end({error: 0, successTips: '修改成功'},res,client)
            }
            // 否则返回没有更新数据错误
            end('collectionUpdateNoData',res,client);
        })
    })
}
// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // res.json({error: 0,data:'商品更新成功',successTips:'商品更新成功'})
    // 获取_id
    let id = ObjectId(req.body._id);
    // 处理req.body 删除_id属性 （数据库系统属性不可修改）
    delete req.body._id;
    // 操作集合 更新匹配_id的对应商品
    collectionHandle('goods',res,(colls,client) => {
        colls.updateOne({_id:id},{$set:req.body},(err,data) => {
            // 如果err 返回集合更新错误
            if(err) {
                return end('collectionUpdateError',res,client);
            }
            // 如果更新成功 返回成功提示
            if(data.result.n > 0) {
                return end({error: 0,successTips:'商品修改成功'},res,client)
            }
            // 否则返回没有更新任何数据提示
            end('collectionUpdateNoData',res,client);
           
    })
})
}
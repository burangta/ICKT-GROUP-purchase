// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // res.json({error: 0,data: '删除商品成功'});
    console.log(req.body.id);
    // 定义删除条件
    let condition = {};
    condition._id = ObjectId(req.body.id);
    // 操作集合
    collectionHandle('goods',res,(colls,client) => {
        // 从数据库中删除对应id的那一项
        colls.removeOne(condition,(err,data) => {
            // 如果err 表示删除失败 返回对应的错误提示
           if(err) {
               return end('collectionRemoveError',res,client);
           }
        //    如果n大于0  表示删除成功 返回对应的提示文本
           if( data.result.n > 0) {
               return end({error:0,successTips:'商品删除成功'},res,client);
           }
        //    如果前两者都不满足 说明没有删除数据 返回对应的提示
           end('collectionRemoveNoData',res,client);
        })
    })

}
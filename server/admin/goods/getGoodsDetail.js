// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
    // res.json({error: 0,data: '请求商品数据成功'});
    // 操作数据库集合
    collectionHandle('goods',res,(colls,client) => {
        // 查询对应_id的商品
        colls.findOne({_id: ObjectId(req.query.id)},(err,data) => {
            // 如果err 返回数据查询错误
            if(err) {
                return end('collectionFindError',res,client);
            }
            // 如果有数据 返回数据
            if(data.title) {
                return end({error: 0,data: data},res,client);
            }
            // 否则返回无对应数据
            end('collectionFindNoData',res,client);
        })
    })
}
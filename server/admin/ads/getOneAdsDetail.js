// 引入操作集合方法
let { collectionHandle,end,ObjectId } = require('../../db');
module.exports = (req,res) => {
   collectionHandle('advertisement',res,(colls,client) => {
    //    查询数据
        colls.findOne({_id:ObjectId(req.query.id)},(err,data) => {
            // console.log(data);
            // 出错返回查询集合错误
            if(err) {
                return end('collectionFindError',res,client);
            }
            // 成功返回数据
            if(data) {
                return end({error:0,data:data},res,client);
            }
            // 否则返回没有查询到数据
            end('collectionFindNoData',res,client);
        })
   })
}
// 引入操作集合方法
let { collectionHandle,end,ObjectId } = require('../db');
module.exports = (req,res) => {
    console.log(req.query.id);
    // 查询数据
    collectionHandle('goods',res,(colls,client) => {
        colls.findOne({_id: ObjectId(req.query.id)},(err,data) => {
            // console.log(data);
            if(err) {
                return end('collectionFindError',res,client);
            }
            if(data) {
                return end({error: 0,data:data},res,client)
            }
            end('collectionFindNoData',res,client)
            // end( data || {},res,client);
        })
    })
}
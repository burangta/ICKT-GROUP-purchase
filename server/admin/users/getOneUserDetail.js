// 引入操作数据库方法
let { collectionHandle, end,ObjectId } = require('../../db');
module.exports = (req,res) => {
//    操作集合
collectionHandle('users',res,(colls,client) => {
    colls.findOne({_id: ObjectId(req.query.id)},(err,data) => {
        // console.log(err,data);
        // 如果出错 返回集合查询错误
        if(err) {
            return end('collectionFindError',res,client);
        }
        // 如果有数据 返回数据
        if(data.username) {
            return end({error: 0,data: data},res,client);
        }
        // 否则返回无对应数据错误
        end('collectionFindNoData',res,client);      
    })
})
}
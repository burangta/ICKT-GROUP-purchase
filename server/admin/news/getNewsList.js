// 引入操作数据库方法
let { collectionHandle, end,ObjectId } = require('../../db');

module.exports = (req,res) => {
//    操作集合
collectionHandle('news',res,(colls,client) => {
    // 查询新闻列表
    colls.find()
        // 倒序
        .sort({_id: -1})
        .toArray((err,data) => {
            // 出错返回c查询集合错误信息
            if(err) {
                return end('collectionFindError',res,client);
            }
            // 查询到数据则返回数据
            if(data.length) {
                return end({error: 0,data: data},res,client);
            }
            // 否则返回无对应数据
            end('collectionFindNoData',res,client);
        })
})
}
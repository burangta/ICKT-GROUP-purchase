// 引入操作数据库方法
let { collectionHandle,end,ObjectId } = require('../../db');


module.exports = (req,res) => {
    // res.json({error: 0,data: '请求广告列表成功'})
    // 查找数据库
    collectionHandle('advertisement',res,(colls,client) => {
        // 查找数据库
        colls.find()
                // 倒序
                .sort({_id: -1})
                // 转为数组
                .toArray((err,data) => {
                    // 出错提示查询错误
                    if(err) {
                        return end('collectionFindError',res,client);
                    }
                    // 如果有数据返回数据
                    if(data.length) {
                        return end({error: 0,data:data},res,client);
                    }
                    // 否则返回无对应数据
                    end('collectionFindNoData',res,client);
                })
    })

}
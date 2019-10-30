// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../../db');
// 引入默认显示数量常量 和 错误对象
let { ADMIN_DEFAULT_SHOW_NUM, ERRORS} = require('../../consts');
module.exports = (req,res) => {
    // 获取页码
    let pageCode = req.query.page -1;
    // 适配pageCode
    pageCode = pageCode > 0 ? pageCode : 0;
    // 查询数据库
    collectionHandle('goods',res,(colls,client) => {
        colls
        .find()
        // 倒序
        .sort({_id: -1})
        .skip(pageCode * ADMIN_DEFAULT_SHOW_NUM)
        .limit(ADMIN_DEFAULT_SHOW_NUM)
        .toArray((err,data) => {
            if(err) {
                // 如果出错 返回数据库查询错误
                return end('collectionFindError',res,client);
            }
            if(data.length) {
                // 如果有数据 把数据返回给前端
                return res.json({error: 0,data: data});
            }
            // 如果没有查到 返回数据库没有查询到对应数据错误
            return end('collectionFindNoData',res,client)
        })
    })
}
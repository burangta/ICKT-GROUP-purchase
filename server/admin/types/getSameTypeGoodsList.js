// 引入操作数据库方法
let { collectionHandle, end,ObjectId } = require('../../db');
// 引入默认显示数量常量
let { ADMIN_DEFAULT_SHOW_NUM} = require('../../consts');
module.exports = (req,res) => {
    // console.log(req.query);
     // 获取页码
     let pageCode = +req.query.page -1;
     // 适配pageCode
     pageCode = pageCode > 0 ? pageCode : 0;
    // 获取分类号
    let typeNumber = +req.query.type;
    // console.log(13,typeNumber);
    // 操作集合
    collectionHandle('goods',res,(colls,client) => {
        // 查询goods集合 
        colls.find({type: typeNumber})
            // 倒序
            .sort({_id: -1})
            // 分页
            .skip(pageCode * ADMIN_DEFAULT_SHOW_NUM)
            // 截取
            .limit(ADMIN_DEFAULT_SHOW_NUM)
            // 转数组
            .toArray((err,data) => {
                // console.log(26,data);
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
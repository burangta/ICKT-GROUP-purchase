// 引入操作数据库方法
let { collectionHandle, end } = require('../../db');
// 引入默认用户列表显示常量
let {  ADMIN_USERS_SHOW_NUM } = require('../../consts');

module.exports = (req,res) => {
    // 获取请求携带的页码
    let num = +req.query.page - 1;
    // 处理页码
    let page = num < 0 ? 0 : num;
    // 操作集合
    collectionHandle('users',res,(colls,client) => {
        // 查询集合
        colls.find()
            // 倒序
            // .sort({_id: -1})
            // 分页
            .skip(ADMIN_USERS_SHOW_NUM*page)
            // .截取 每页显示5个
            .limit(ADMIN_USERS_SHOW_NUM)
            // 转数组
            .toArray((err,data) => {
                // 如果出错 返回查询错误
                if(err) {
                    return end('collectionFindError',res,client)
                }
                // 如果查询成功 返回数据
                if(data.length) {
                    return end({error: 0,data: data},res,client)
                }
                // 否则返回没有查询到相关数据错误
                // end('collectionFindNoData',res,client)
                end({data:[]},res,client);
            })
    })

}
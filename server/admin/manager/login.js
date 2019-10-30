// 引入操作数据库方法
let { collectionHandle, end } = require('../../db');
module.exports = (req, res) => {
    // 获取前端携带的用户名密码
    console.log(req.body);

    // 连接数据库
    collectionHandle('manager', res, (colls, client) => {
    //     // 第一次登录的时候 把用户名密码存储到数据库
    //     // 获取用户名密码
    //     let { username,password } = req.body.userInfo;
    //     // 定义数据库存储对象
    //     let obj = { username, password };


    //     colls.insertOne(obj,(err,data) => {
    //         if(err) {
    //             console.log(err);
    //             return end('collectionInsertError',res,client)
    //         }
    //         else if(data.result.n > 0) {

    //             return end('success',res,client);
    //         }
    //     })

        // 再次登录需要验证用户名 密码是否正确 查询数据库

        colls.findOne(req.body.userInfo,(err,result) => {
            // 如果出错 返回连接数据库错误信息
            if(err) {
                return end('dbConnectError',res,client);
            }
            // 如果查询到结果
            else if(result) {
                // 存储session 
                req.session.username = req.body.userInfo.username;
                // 并把用户名返回给前端
                return end({error: 0,data: result.username},res,client)
            }else {
                // 如果查询结果为空，表示用户未登录 返回对应的错误信息
                end('loginNoData',res,client);
            }
        })

     
    })
}
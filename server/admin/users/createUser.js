// 引入操作数据库方法
let { collectionHandle, end } = require('../../db');

module.exports = (req,res) => {
    // res.json('用户创建成功');
    console.log(req.body);
    collectionHandle('users',res,(colls,client) =>{
        // 插入数据
        colls.insertOne(req.body,(err,data) => {
            // console.log(data);
            // 如果出错 返回插入集合错误
            if(err) {
                return end('collectionInsertError',res,client);
            }
            if(data.result.n >0) {
                // 如果成功，返回插入的数据
                return end({error: 0,successTips:'用户创建成功'},res,client);
            }
            end('collectionInsertNoData',res,client);
            
        })
    })
}
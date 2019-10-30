// 解构数据库操作和返回数据方法 
let { collectionHandle, end } = require('../../db');
// 解构ERRORS
let { ERRORS } = require('../../consts');

module.exports = (req, res) => {
    // 获取session中的用户名 如果用户有登录 更新数据
    if (req.session.username) {
        collectionHandle('manager', res, (colls, client) => {
            // 更新数据库
            colls.updateOne({username: req.session.username }, { $set: req.body }, (err, data) => {
                console.log(12, err);
                console.log(13, data);
                // 如果错误 返回数据更新失败提示
                if (err) {
                    return end('collectionUpdateError', res, client)
                } else if (data.result.n > 0) {
                    // 清空之前的session中的用户名
                    delete req.session.username;
                    // 如果更新成功 返回更新成功信息
                    return res.json({ error: 0, data: "用户名密码修改成功" })
                } else {
                    // 否则返回没有更新数据提示信息
                    end('collectionUpdateNoData', res, client);
                }
            })

        })
    }

}
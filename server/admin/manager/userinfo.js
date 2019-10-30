// 解构ERRORS
let { ERRORS } = require('../../consts');

module.exports = (req,res) => {
    // 如果用户有登录  返回用户名给前端
    if(req.session.username) {
        return res.json({error: 0,data: req.session.username});
    }else {
        // 否则返回错误信息
        res.json(ERRORS.notLogin);
    }
}
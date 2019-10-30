
module.exports = (req,res) => {
    // 清空session中的用户名
    delete req.session.username;
    // 重定向到登录页面
    res.redirect('/admin');
}
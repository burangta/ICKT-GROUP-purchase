// 引入fs模块
let fs = require('fs');
// 引入formidable模块
let Formidable = require('formidable');
// 引入path模块
let path = require('path');
// 解构缓存路径和存储的真实路径
let { UPLOAD_CACHE_DIR, UPLOAD_REAL_DIR } = require('../../consts');

module.exports = (req,res) => {
    // res.json({error: 0,data: '/static/img/item/01.jpg'});
    // 实例化Formidable
    let fm = new Formidable();
    // 设置临时缓存的上传路径
    fm.uploadDir = path.join(process.cwd(),UPLOAD_CACHE_DIR);
    // 解析上传的数据
    fm.parse(req,(err,textdata,filedata) => {
        if(err) {
            // 如果出现异常 返回提示信息
            return res.json({error: 1,errorText:'上传失败'})
        }
        // 定义20位的随机字符串
        let r20 = String(Math.random()).slice(2,12) + String(Math.random()).slice(2.12);
        // 获取图片存储的原始路径
        let oldPath = filedata.file.path;
        // 定义新路径 图片名称是20位随机字符串带上原有的名字
        let newPath = path.join(process.cwd(),UPLOAD_REAL_DIR) +r20 + filedata.file.name;
        // 更名
        fs.rename(oldPath,newPath,(err) => {
            if(err) {
                // 如果出现异常 返回提示信息
                return res.json({error: 2,errorText:'更名失败'});
            }
            // 如果没有出现异常 返回图片路径
            res.json({error: 0,data: UPLOAD_REAL_DIR  +r20 + filedata.file.name});
        });
        // console.log(666,newPath);
        // console.log(555,oldPath)
    })
}
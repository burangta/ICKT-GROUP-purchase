// 引入服务器模块
let http = require('http');
let https = require('https');
// 引入fs
let fs = require('fs')
// 引入path
let path = require('path');
// 获取默认端口号
let { HTTP_PORT,HTTPS_PORT } = require('../consts');

module.exports = app => {
    // console.log(process.argv);
    // 定义http和https端口
    let httpPort = process.argv[2] || HTTP_PORT;
    let httpsPort = process.argv[3] || (process.argv[2] ? (+process.argv[2] + 1) : HTTPS_PORT);
    http.createServer(app)
	.listen(httpPort,() => {console.log('http listen to ' + httpPort)});
	
// 读取ssl秘钥文件
let key = fs.readFileSync(path.join(process.cwd(),'./ssl/private.pem'));
let cert = fs.readFileSync(path.join(process.cwd(),'./ssl/file.crt'));

// https监听3001端口号
https.createServer({key,cert},app)
     .listen(httpsPort,() => {console.log('https listen to ' + httpsPort )});
}
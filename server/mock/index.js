// 引入express
let express = require('express');
// 引入path模块
let path = require('path');

module.exports = app => {
// 处理admin/login请求
// app.post('/admin/login',(req,res)=> {
// 	console.log(req.body);
// 	res.json({error:0})
// })
// 模拟登录失败
// app.post('/admin/login',(req,res)=> {
// 	console.log(req.body);
// 	res.json({error:1,errorText:'登录失败'})
// })


// 处理修改信息请求
// app.post('/admin/modifyUserInfo',((req,res) => {
// 	res.json({error:0,data:'修改成功'})
// }));
// 模拟修改信息失败
// app.post('/admin/modifyUserInfo',((req,res) => {
// 	res.json({error:1,errorText:'修改用户信息失败'})
// }));

// 后台模拟数据
app.use('/admin/',(req,res,next) => {
	let arr = req.url.split('?');
	arr[0] += '.json';
	req.url = arr.join('?');
	console.log(req.url);
	// next()方法必须要执行
	next();
},express.static(path.join(process.cwd(),'./static/data/')));

// 模拟数据
app.use('/data/', (req, res, next) => {
	// console.log(req.url)
	// 处理req.url
	// 1.转成数组 以问号分隔
	let arr = req.url.split('?');
	// 问号之前的添加上.json
	arr[0] +='.json';
	// 再用问号拼接成字符串
	req.url = arr.join('?');
	// console.log(req.url)
	// 读排序和搜索请求做处理
	if(req.url.indexOf('sort')>-1 || req.url.indexOf('search')>-1) {
		let str = req.url.split('?')[1];
		req.url = '/list.json?'+str;
		// console.log(req.url);
		// 后面要去数据库查找匹配项再返回 后面补上
	}
	// console.log(req.url);
	// 必须执行next
	next();
},  express.static(path.join(process.cwd(), './static/data/')))
// 静态化static目录
app.use('/static/',express.static('./static'));


}
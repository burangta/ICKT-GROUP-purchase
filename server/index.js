// 引入服务器模块
let server = require('./server');
// 引入中间件模块
let middleware = require('./middleware');
// 引入mock模块
let mock = require('./mock');
// 引入router模块
let router = require('./router');
// 引入express
let express = require('express');
// 引入path模块
let path = require('path');
// 引入fs
let fs = require('fs');

let ejs = require('ejs');
// 修改ejs插值语法
ejs.delimiter = '$';

// 创建应用程序
let app = express();





// 引入服务端渲染模块
let { createRenderer } = require('vue-server-renderer');
// 引入应用程序
let ICKTGroup = require('../home/public/tongbu');
// 定义渲染库
let renderer = createRenderer({
    // 模板文件
    template: fs.readFileSync(path.join(process.cwd(),'./home/public/tongbu.html'),'utf-8')
})
app.get('/abc',(req,res) => {
    renderer.renderToString(ICKTGroup,{
        title:'ICKT团购官网',
        meta: `<meta name="keywords" content="ICKT团购">
    <meta name="description" content="ICKT团购官网">`
    })
            .then((html) => res.end(html))
            .catch(err => console.log(err));
})






// 使用中间件模块
middleware(app);
// 使用路由模块
router(app);
// 使用mock模块
// mock(app);

// 执行服务器
server(app);





























































































// // 引入express
// let express = require('express');
// // // 引入服务器模块
// // let http = require('http');
// // let https = require('https');
// // 引入body-parser
// // let body_parser = require('body-parser');
// // 引入ejs模块
// // let ejs = require('ejs');
// // 引入path模块
// let path = require('path');
// // 引入fs模块
// // let fs = require('fs');
// // 创建应用程序
// let app = express();

// 配置body_parser
// app.use(body_parser.urlencoded({extended:false}));
// 设置模板引擎
// app.set('views engine','ejs');
// 修改html拓展名
// app.engine('.html',ejs.__express);


// // 模拟数据
// app.use('/data/', (req, res, next) => {
// 	// console.log(req.url)
// 	// 处理req.url
// 	// 1.转成数组 以问号分隔
// 	let arr = req.url.split('?');
// 	// 问号之前的添加上.json
// 	arr[0] +='.json';
// 	// 再用问号拼接成字符串
// 	req.url = arr.join('?');
// 	// console.log(req.url)


// 	// 读排序和搜索请求做处理
// 	if(req.url.indexOf('sort')>-1 || req.url.indexOf('search')>-1) {
// 		let str = req.url.split('?')[1];
// 		req.url = '/list.json?'+str;
// 		// console.log(req.url);
// 		// 后面要去数据库查找匹配项再返回 后面补上
// 	}
// 	// console.log(req.url);
// 	// 必须执行next
// 	next();
// },  express.static(path.join(process.cwd(), './static/data/')))
// // 静态化static目录
// app.use('/static/',express.static('./static'));



// // 处理/请求
// app.get('/',(req,res) => {
//     res.render('home.html');
// })
// // 后台界面
// app.get('/admin',(req,res) => {
// 	res.render('admin.html');
// })

// // 处理admin/login请求
// app.post('/admin/login',(req,res)=> {
// 	console.log(req.body);
// 	res.json({error:0})
// })
// // 模拟登录失败
// // app.post('/admin/login',(req,res)=> {
// // 	console.log(req.body);
// // 	res.json({error:1,errorText:'登录失败'})
// // })


// // 处理修改信息请求
// app.post('/admin/modifyUserInfo',((req,res) => {
// 	res.json({error:0,data:'修改成功'})
// }));
// // 模拟修改信息失败
// // app.post('/admin/modifyUserInfo',((req,res) => {
// // 	res.json({error:1,errorText:'修改用户信息失败'})
// // }));


// // 后台模拟数据
// app.use('/admin/',(req,res,next) => {
// 	let arr = req.url.split('?');
// 	arr[0] += '.json';
// 	req.url = arr.join('?');
// 	console.log(req.url);
// 	// next()方法必须要执行
// 	next();
// },express.static(path.join(process.cwd(),'./static/data/')));

// // http.createServer(app)
// // 	.listen(3000,() => {console.log('http listen to 3000')});
	
// // // 读取ssl秘钥文件
// // let key = fs.readFileSync(path.join(process.cwd(),'./ssl/private.pem'));
// // let cert = fs.readFileSync(path.join(process.cwd(),'./ssl/file.crt'));

// // // https监听3001端口号
// // https.createServer({key,cert},app)
// //      .listen(3001,() => {console.log('https listen to 3001')});

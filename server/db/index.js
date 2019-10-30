// 解构MongoClient
let { MongoClient,ObjectId } = require('mongodb');
// 引入URL和数据库名称常量
let { MONGO_URL,MONGO_NAME,ERRORS} = require('../consts');
// 封装操作数据的方法
/**
 *
 * @param {*} collectionName 集合名称
 * @param {*} res 响应对象
 * @param {*} callback 操作集合的方法 增删改查
 */
function collectionHandle (collectionName,res,callback) {
	// 连接数据库
	MongoClient.connect(MONGO_URL,(err,client) => {
		if(err) {
            // 返回数据并关闭连接
            // return end({error:1,data:'连接数据库失败'},res,client);
		}
		// 获取数据库
		let db = client.db(MONGO_NAME);
        // 操作数据库
        callback(db.collection(collectionName),client);
	})
}

// 封装返回数据并关闭数据库连接的方法
function end(data,res,client) {
    if(typeof data === "string") {
        res.json(ERRORS[data]);
    }else{
        res.json(data);
    }
    client.close();
}
// 暴露接口
module.exports = { collectionHandle,end,ObjectId };
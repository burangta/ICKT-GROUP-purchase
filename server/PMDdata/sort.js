// 引入数据库操作方法
let { collectionHandle,end,ObjectId } = require('../db');
// 引入过滤数组方法
let { filterArray } = require('../tools');
// 引入移动端商品默认显示数量常量
let { PMD_DEFAULT_SHOW_NUM } = require('../consts');
// filterArray(data1,['img','title','sales','price','originPrice','_id']);

module.exports = (req,res) => {
    console.log(req.query);
    // 定义查询条件
    let condition = {};
    if(+req.query.type) {
        // 根据分类类型值赋值给查询对象的type
        condition.type = +req.query.type;
    }
    // 处理优惠排序
    if(req.query.id ==='discount') {
        let sort_way = (req.query.sort_way==='descend'?-1:1)
        collectionHandle('goods',res,(colls,client) => {
            colls.
            find(condition)
            .toArray((err,data) => {
               let result =  data.sort((a,b) => sort_way*(a.originPrice-a.price) - sort_way*(b.originPrice-b.price))
               end(result,res,client);
            })
           
        })
        return;
    }
    // 操作集合
    collectionHandle('goods',res,(colls,client) => {
        colls.find(condition)
            // 排序 根据传递的id(price/sales等等) 和 排序方法（sort_way)来排序
            .sort({[req.query.id] : (req.query.sort_way=='descend'?-1:1)})
            // 截取
            .limit(PMD_DEFAULT_SHOW_NUM)
            .toArray((err,data) => {
                // console.log(err,data);
                end(filterArray(data,['img','title','sales','price','originPrice','_id']),res,client);
            })
    })
    // res.json('排序请求成功啦');
}
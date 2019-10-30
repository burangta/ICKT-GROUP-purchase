// 定义校验用户名的方法
let checkUserName = function (filed,value,callback) {
    // 如果用户名为空 提示用户
    if(!value) {
        return callback(new Error('用户名不能为空'))
    }
    // 如果不为空 校验用户名
    if(!/^\w{4,8}$/.test(value)) {
        return callback(new Error('请输入4-8为字母数字下划线的合法用户名'))
    }
    // 验证通过的情况 回调函数也必须执行
    callback();
}
// 定义校验密码的方法
let checkPassword = function(filed,value,callback) {
    // 如果密码为空 提示用户
    if(!value) {
        return callback(new Error('密码不能为空哦'));
    }
    // 如果不为空 校验密码
    if(!/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(value)) {
        
        return callback(new Error('密码必须包含数字和字母哦'));
    }
    callback();
}


// 定义校验重复字段方法
/**
 *
 *
 * @param {*} reCheckName 校验的重复字段
 * @param {*} errorKeyText 错误提示关键字
 * @param {*} filed 当前字段
 * @param {*} value 当前输入的值
 * @param {*} callback 校验的回调函数
 */
let reCheck = function(reCheckName,errorKeyText,filed,value,callback) {
    // 如果为空 提示用户
    if(!value) {
        return callback(new Error(`重复${errorKeyText}不能为空哦`))
    }
    // 如果不为空 开始校验重复字段
    if(reCheckName !== value) {
        return callback(new Error(`重复${errorKeyText}不匹配`))
    }
    // 如果匹配 callback也是要执行 不需要传参
    callback();
}

// 定义校验该字段是否是满足必填的方法
function checkRequired(filed,value,callback) {
    // 如果为空  提示用户
    if(!value) {
        return callback(new Error('该字段是必填的'));
    }
    // 如果不为空 也要执行回调函数
    callback();
}


// 定义校验手机号码方法
function checkTelNumber(filed,value,callback) {
    // 如果为空 提示用户
    if(!value) {
        return callback(new Error('该字段是必填的'));
    }
    // 如果不合法 提示用户
    if(!(/^1[3456789]\d{9}$/.test(value))) {
        return callback(new Error('请输入有效电话号码'))
    }
    // 如果合法 执行callback
    callback();
}

// 定义校验内容长度的方法
function checkContentLength(filed,value,callback) {
    if(!value) {
        return callback(new Error('请输入简介'));
    }
    if(String(value).length > 130) {
        return callback(new Error('已超规定字数哦'))
    }
    callback();
}


// 定义校验内容长度的方法
function checkContentLength2(filed,value,callback,length) {
    if(!value) {
        return callback(new Error('请输入简介'));
    }
    if(String(value).length > length) {
        return callback(new Error('已超规定字数哦'))
    }
    callback();
}

// 暴露接口
export  {
    checkUserName,
    checkPassword,
    reCheck,
    checkRequired,
    checkTelNumber,
    checkContentLength,
    checkContentLength2
}


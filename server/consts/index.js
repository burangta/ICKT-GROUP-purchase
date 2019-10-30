module.exports = {
    // 定义http监听的默认端口号
    HTTP_PORT: 3000,
    // 定义https监听的默认端口号
    HTTPS_PORT: 3001,
    // 静态化配置
    STATIC: {
        '/static/': './static/',
        '/favicon.ico': './favicon.ico'
    },
    // 数据库URL
    MONGO_URL:'mongodb://localhost:27017',
    // 数据库名称
	MONGO_NAME: 'ICKTGroup',
	// 配置文件上传的缓存存储路径
	UPLOAD_CACHE_DIR:'/cache/uploads/',
	// 配置文件存储真实路径
	UPLOAD_REAL_DIR: '/static/uploads/',
	// 配置后台商品默认展示数量
	ADMIN_DEFAULT_SHOW_NUM: 6,
	// 配置移动端商品默认展示数量
	PMD_DEFAULT_SHOW_NUM: 10,
	// 配置用户列表默认显示用户数量
	ADMIN_USERS_SHOW_NUM: 5,
    // 数据信息
	ERRORS: {
		// 成功
		success: { error: 0, data: 'success' },
		// 打开数据库错误
		dbConnectError: { error: 1, errorText: '数据库错误' },
		// 集合插入数据错误
		collectionInsertError: { error: 2, errorText: '数据库错误' },
		// 没有插入数据
		collectionInsertNoData: { error: 3, errorText: '数据库错误' },
		// 集合查询错误
		collectionFindError: { error: 4, errorText: '数据库错误' },
		// 没有查询到错误
		collectionFindNoData: { error: 5, errorText: '没有对应的数据' },
		// 用户名密码不匹配错误
		loginNoData: { error: 6, errorText: '用户名或者密码错误' },
		// 用户尚未登录错误
		notLogin: { error: 7, errorText: '该用户尚未登录' },
		// 集合更新错误
		collectionUpdateError: { error: 8, errorText: '数据库错误' },
		// 没有更新错误
		collectionUpdateNoData: { error: 9, errorText: '数据库错误' },
		// 删除失败错误
		collectionRemoveError: {error: 10,errorText: '数据删除失败'},
		// 没有删除数据错误
		collectionRemoveNoData: {error: 11,errorText:'没有删除数据'}
	}
}
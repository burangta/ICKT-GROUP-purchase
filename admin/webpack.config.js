// 引入path
let path = require('path');
// 引入html模板插件
let  HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入拆分库插件
let { CommonsChunkPlugin, UglifyJsPlugin } = require('webpack').optimize;
// 引入拆分样式插件
let  ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入压缩css插件
let  OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
// 配置
module.exports = {
    // 解决问题
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': path.join(process.cwd(),'./src')
        }
    },
    // 入口文件
    entry:{
        'main' : './src/main.js',
        'lib': ['vue','element-ui']
    },
    // 出口配置
    output: {
        path: path.join(process.cwd(),'../'),
        filename: './static/admin/[name].js'
    },
    module: {
        rules: [
            // es6语法
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['es2015'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            // 图片加载机
            {
                test: /\.(ttf|woff)$/,
                loader:'url-loader'
            },
            // scss加载机
            {
                test: /\.scss$/,
                // loader: 'style-loader!css-loader!sass-loader'
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            // css加载机
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // vue加载机
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // 配置es6语法
                options: {
                    // 拆分样式：
                    extractCSS: true,
                    // 编译ES6
                    loaders: {
                        js: ['babel-loader?presets[]=es2015']
                    }
                }
            }

        ]
    },
    plugins: [
        // 配置模板文件
        new HtmlWebpackPlugin({
            // 入口
            template: './public/index.html',
            // 发布的位置
            filename: './views/admin.html',
            // 添加指纹
            hash: true
        }) ,
        // 拆分库文件
        new CommonsChunkPlugin('lib'),
        // 拆分css文件
        new ExtractTextPlugin('./static/admin/style.css'),
        // 压缩JS
        // new UglifyJsPlugin(),
        // 压缩CSS
        // new OptimizeCssAssets()
    ]
}
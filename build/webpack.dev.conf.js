const webpack=require('webpack');
//require工作原理:首先确定是否是一个原生的模块,如果不是就进入node_modules查找,再看是否在package.json的main里面定义。
const merge=require('webpack-merge');
//webpack-merge提供了一个merge连接数组并合并创建新对象的函数
const baseWebpackConfig=require('./webpack.base.conf.js');
//引入基础webpack设置
const HtmlWebpackPlugin=require('html-webpack-plugin');
const derServerPort=9999;
//基本作用就是生成html文件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//友好的提示

module.exports=merge(baseWebpackConfig,{
    mode:'development',//开发环境,会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
    devtool:'inline-source-map',//打包编译生成一个 DataUrl 形式的 SourceMap 文件.
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"typed-css-modules-loader",options:{modules:true}}
                ],
            },
            {
                test:/\.(sc|sa)ss$/,
                exclude:[/node_modules/],
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader",options:{modules:true,localIdentName: '[name]__[local]__[hash:base64:5]'}},
                    {loader:"sass-loader"},
                    {loader:"typed-css-modules-loader",options:{modules:true}}
                    // {loader: 'typings-for-css-modules-loader',options: {modules: true,namedExport: true}}
                ],
           
            },
            {
                test:/\.less$/,
                exclude:[/node_modules/],
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader",options:{modules:true,localIdentName: '[name]__[local]__[hash:base64:5]'}},
                    {loader:"less-loader"},
                    {loader:"typed-css-modules-loader",options:{modules:true}}
                ],
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        port:derServerPort,//指定要监听请求的端口号
        overlay:{//当编译器存在错误或警告时,将浏览器显示全屏覆盖
            warnings:false,
            errors:true,
        },
        host:"127.0.0.1",
        open:true,//开发服务器将打开浏览器
        noInfo:true,//那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        https:false,
        hot:true,//启用webpack的模块热更新
        compress:true,//一切服务都启用gzip压缩
        progress:true,//将任务进度输出到控制台
        quiet:true,
        useLocalIp:false,//此选项允许浏览器使用你的本地ip打开
        proxy:{//代理服务器
            "/api":{
                target:"http://localhost:3000",
                changeOrigin:true,
                pathRewrite:{"^api":"/api"}
            }
        }
    },
    plugins:[
        //处理html
        new HtmlWebpackPlugin({
            template:'src/public/index.html',//开发环境需要路径
            inject:'body',//所有javascript资源将被放置在body元素的底部
            minify:{
                html5:true,
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            title:'基于react的webpack4的简易教手架项目(development)',
            hash:true,
            favicon:'assets/images/favicon-react.ico',//将给定的favicon路径添加到输出HTML
            showErrors:true,
        
        }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${derServerPort}`],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function (severity, errors) {},
            clearConsole: true,
            additionalFormatters: [],
            additionalTransformers: []
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                // postcss:[
                //     require('postcss-plugin-px2rem')({
                //         rootValue:75,
                //         selectorBlackList:['html'],
                //         mediaQuery:true,
                //         propBlackList:['75px']
                //     })
                // ],
            }
        })
    ]
});
const merge=require('webpack-merge');
const baseWebpackConfig=require('./webpack.base.conf.js');
const webpack=require('webpack');
const path=require('path');
const DIST_PATH=path.resolve(__dirname,"../dist");
//打包之前清除文件
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
//打包的时候分析包大小等
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//分离css
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports=merge(baseWebpackConfig,{
    mode:"production",//会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    output:{
        filename:"js/[name].[hash].js",
        path:DIST_PATH
    },
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:"postcss-loader"},
                ]
            },
            {
                test:/\.(sc|sa)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader',options:{modules:true,localIdentName: '[name]__[local]__[hash:base64:5]',camelCase:true}},
                    {loader:"sass-loader"},
                    {loader:"postcss-loader"},
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader'},
                    {loader:'less-loader'},
                    {loader:"postcss-loader"},
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:10000,
                            name:"[hash].[ext]",
                            outputPath:"images/"
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist'],{root:path.resolve(__dirname,'../'),verbose:true}),//每次打包前清除dist
        new HtmlWebpackPlugin({
            //将目录下的index.html引进生成的dist中的index.html
            template:'src/public/index.html',
            title:'基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(product生产环境)',
            favicon:'assets/images/favicon-react.ico',
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            },
            
        }),
        new BundleAnalyzerPlugin({//打包分析
            analyzerPort:10000,
            openAnalyzer:true,
        }),
        new MiniCssExtractPlugin({//分离css
            filename:"css/[name].[chunkhash:8].css",
            chunkFilename:"css/[id].[hash].css"
        })
    ]
});

const path=require('path');
//path是node.js的一个模块，提供了一些用于处理文件路劲的小工具
const SRC_PATH=path.resolve(__dirname,"../src");


module.exports={
    entry:{
        main:'./src/index.js',//入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:'babel-loader',
                //排除node_modules目录下的文件
                exclude:/node_modules/,
                include:SRC_PATH
            },
            {
                test:/\.tsx?$/,
                use:'ts-loader'
            },
            {
                test:/\.(woff|svg|eot|woff2|tff)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000
                        }
                    }
                ],
                exclude:/node_modules/,
            }
        ]
    },
    node:{
        dns:'empty',
        net:'empty',
    },
    plugins:[
       
    ]
}
const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    mode:"development",
    entry : {
        app:[
            "babel-polyfill",
            path.join(__dirname,'src/index.js')
        ]
    },

    output :{
        path : path.join(__dirname,'dist'),
        filename:"js/bundle.[hash].js",
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath:"/"
    },

    module : {
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        cacheDirectory:true,
                        // presets:['@babel/preset-env']
                    }
                },
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:["url-loader"]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
    ],

    devServer: {
        contentBase:'./dist',
        historyApiFallback: {
            disableDotRule: true
        },
    },
    resolve:{
        extensions: [".js","jsx", ".json"],
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    }
}

module.exports = commonConfig;
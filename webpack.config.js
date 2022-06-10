var path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

let target = "web";

if(process.env.NODE_ENV === "production") {
    mode = "production";
    target ="browserslist";

}
module.exports = {
    mode: mode,
    
    target: target,

    output:{
        assetModuleFilename:"images/[hash][ext][query]",
    },

    module: {
        rules: [

            {
                test: /\.(s[ac]|c)ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    },
                },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
    
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:30*1024,
                    },
                },
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                }
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin()
    ],
   
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true
    },
};
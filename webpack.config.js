const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const path = require('path');
const { Template } = require("webpack");

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
        path: path.resolve(__dirname, "dist"),
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({template:"./src/index.html"})
    ],
   
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true
    },
};
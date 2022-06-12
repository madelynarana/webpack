const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');


const devMode = process.env.NODE_ENV !== "production";


module.exports = {
  
    mode: devMode ? "development" : 'production',

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/img/[hash][ext][query]",
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
                type: "asset/resource",
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

        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css'
        }),
        new HtmlWebpackPlugin({ 
            template: "./src/index.html" 
        })
    ],

    target: devMode ? "web" : "browserslist",
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9090,
        open: true,
        hot: true
    },
};
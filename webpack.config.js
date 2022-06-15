const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path                   = require('path');


const devMode = process.env.NODE_ENV !== 'production'; // Development mode

module.exports = {

    mode: devMode ? 'development' : 'production',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: devMode ? 'assets/js/main.js': '[contenthash].js',
        assetModuleFilename: devMode ? 'assets/img/[name][ext]': 'img/[hash][ext]',
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath:  devMode ? '../../':''
                    },
                },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },

            {
                test: /.(ttf|otf|txt|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                generator : {
                    filename : devMode ? 'assets/font/[name][ext][query]':'font/[name][ext][query]',
                }
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: devMode ? 'assets/css/[name].css': '[contenthash].css',   
        }),

        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        })
    ],

    target: devMode ? 'web' : 'browserslist',

    devtool: 'source-map',

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9090,
        open: true,
        hot: true
    },
};
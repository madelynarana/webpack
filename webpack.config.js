const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production'; // Development mode


function getEntry() {
    const entry = {};

   //Directorio para recopilar archivos de entrada
    const filePaths = glob.sync('src/pages/*');

    // El nombre del directorio, que es el nombre del archivo empaquetado
    filePaths.forEach(filePath => {
        const filename = path.basename(filePath);
        entry[filename] = `./${filePath}/script.js`;
      });
    return entry;
  }



module.exports = {

    mode: devMode ? 'development' : 'production',

    entry: getEntry(),
    // entry: {
    //     index: {
    //         import: './src/pages/index/script.js',
    //         filename: 'index/script.js',
    //     },
    //     about: {
    //         import: './src/pages/about/script.js',
    //         filename: 'about/script.js',
    //     },
    // },
    output: {
        filename: "[name]/script.js",
        assetModuleFilename: devMode ? 'assets/img/[name][ext]': 'img/[hash][ext]',
        clean: true,
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
                        publicPath:    '../'
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
        new MiniCssExtractPlugin({
            filename:  '[name]/style.css',   
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/index/index.html',
            chunks: ['index'],
            filename: 'index.html'
        
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/about/index.html',
            chunks: ['about'],
            filename: 'about/index.html'
        }),
    ],

    target: devMode ? 'web' : 'browserslist',

    devtool: 'source-map',

    devServer: {
        static: {
            directory: './src',
        },

        port: 9090,
        open: true,
        hot: true
    },
};
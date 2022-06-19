const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const glob                 = require('glob');
const path                 = require('path');

const devMode = process.env.NODE_ENV !== 'production'; // Development mode

const entry = {};

const getEntry = () => {
    const filePaths = glob.sync('src/pages/*'); // Directory to collect input files.

    filePaths.forEach(filePath => { // Name of the directory, which is  name of package file.
        const filename = path.basename(filePath);
        entry[filename] = `./${filePath}/script.js`;
    });
    return entry;
}

const getEntryHtmlPlugins = () => {
    return Object.keys(entry).map(filename => {
        return new HtmlWebpackPlugin({
            template: `./src/pages/${filename}/index.html`,
            filename: filename === "index" ? `index.html` : `${filename}/index.html`,
            chunks: [`${filename}`],
        });
    });
};


module.exports = {

    mode: devMode ? 'development' : 'production',

    entry: getEntry(),

    output: {
        filename: "[name]/script.js",
        assetModuleFilename: devMode ? 'assets/img/[name][ext]' : 'img/[hash][ext]',
        clean: true,
    },

    module: {
        rules: [

            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },

            {
                test: /\.(s[ac]|c)ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
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
                generator: {
                    filename: devMode ? 'assets/font/[name][ext][query]' : 'font/[name][ext][query]',
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
            filename: '[name]/style.css',
        }),

        ...getEntryHtmlPlugins(),
    ],

    target: devMode ? 'web' : 'browserslist',

    devtool: 'source-map',

    devServer: {
        static: {
            directory: './src',
        },

        port: 9090,
        open: true,
        hot: true,
    },
};
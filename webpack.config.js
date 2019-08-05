const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        // print: './src/print.js',
        home: [
            './src/assets/styles/sass/home.scss',
            './src/assets/js/home.js'
        ]
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        // Limpa o diretório de saída ...
        new CleanWebpackPlugin(),
        // Configuração de template para a página inicial ...
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['home'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            base: 'about',
            filename: 'about/index.html',
            template: './src/about/index.html',
            chunks: ['about'],
            hash: true
        }),
        // Configuração para geração de favicon ...
        new FaviconWebpackPlugin({
            logo: './src/assets/favicon/balloons.png',
            title: 'CSS Shapes',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new CopyWebpackPlugin([
            {from: './src/assets/images', to: 'images'},
            {from: './src/assets/svgs', to: 'svgs'}
        ]),
    ]
};
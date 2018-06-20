const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        admin: path.resolve(__dirname, '../src/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'styles', 'admin'],
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true,
            title: "Lizc博客后台"
        })
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        ["@babel/plugin-transform-runtime", {
                            "helpers": false,
                            "polyfill": false,
                            "regenerator": true,
                            "moduleName": "@babel/runtime"
                        }],
                        "@babel/plugin-syntax-dynamic-import",
                        ["import", { libraryName: 'antd', style: "css" }]
                    ]
                }
            }
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            'assets': path.resolve(__dirname, '../src/assets')
        }
    }
};
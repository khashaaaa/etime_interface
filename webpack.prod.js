const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimize = require('css-minimizer-webpack-plugin')
const Terserplugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].[contenthash].bundled.js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimize(),
            new Terserplugin(),
            new HtmlWebpackPlugin({
            template: "public/template.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
                }
            })
        ],
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            }
        ]
    }
})
const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}
                    },
                    {
                        loader: 'postcss-loader', options: {sourceMap: true}
                    },
                    {
                        loader: 'sass-loader', options: {sourceMap: true}
                    }
                ]
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        historyApiFallback: true,
        open: true,
        port: 3000
    }
})
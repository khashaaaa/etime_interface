const path = require('path')

module.exports = {
    entry: {
        main: path.join(__dirname, "src/index.js"),
        vendor: path.join(__dirname, "src/vendor.js")
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundled.js"
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src") ,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: "asset/resource"
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: "asset/inline"
            }
        ]
    }
}
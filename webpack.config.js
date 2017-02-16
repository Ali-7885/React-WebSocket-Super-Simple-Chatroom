var path = require('path');
var webpack = require("webpack");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
       path: path.join(__dirname, 'public/js/'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    devServer: {
        inline: true,
        contentBase: "./public/",
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ["babel-loader"],
                query: {
                    presets: ["latest", "stage-0", "react"]
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
}

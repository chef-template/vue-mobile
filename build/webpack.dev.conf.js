var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackBaseConfig = require('./webpack.base.conf')

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"develop"'
            }
        })
    ],
    devServer: {
        noInfo: true,
        quiet: true
    },
    server: {
        // port: 8080, // server port
        // proxy: {
        //     host: '', // proxy url
        //     match: /^/ // proxy match regexp
        // }
    }
})
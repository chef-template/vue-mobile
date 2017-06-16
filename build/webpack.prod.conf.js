var webpack = require('webpack')
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const webpackProdConfig = {
    entry: {
        vendors: ['vue', 'vue-router', 'vue-http']
    },
    output: {
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.[hash:7].js'
        })
    ]
}

if (isProduction) {
    webpackProdConfig.plugins.push(new ExtractTextPlugin('css/[name].[hash:7].css'))
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
var webpack = require('webpack')
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
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
                NODE_ENV: '"test"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name].[hash:7].css'),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:7].js')
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
        }
    }
})
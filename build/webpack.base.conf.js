var path = require('path')
var webpack = require('webpack')
var px2rem = require('postcss-px2rem')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: [path.resolve(process.cwd(), 'src/entry.js')]
    },
    output: {
        publicPath: '/',
        filename: 'bundle.js',
        path: path.resolve(process.cwd(), 'dist')
    },
    resolve: {
        extensions: ['', '.js', '.css', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.runtime.common.js',
            'pages': path.resolve(process.cwd(), 'src/pages'),
            'plugins': path.resolve(process.cwd(), 'src/plugins'),
            'components': path.resolve(process.cwd(), 'src/components')
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(process.cwd(), 'index.html')
        })
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    },
    vue: {
        postcss: [
            autoprefixer({ browsers: ['last 7 versions'] }),
            px2rem({
                remUnit: 75
            })
        ]
    }
}
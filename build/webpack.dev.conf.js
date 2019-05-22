const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ENV = require('./webpack.env.conf')
const webpackBaseConfig = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	output: {
		filename: '[name].js'
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`You application is running here http://0.0.0.0:${process.argv[6]}`]
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': Object.assign({
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}, ENV[process.env.NODE_ENV])
		})
	],
	devServer: {
		hot: true,
		quiet: true,
		host: '0.0.0.0',
		stats: 'errors-only',
    clientLogLevel: 'none',
    disableHostCheck: true,
		historyApiFallback: {
			disableDotRule: true,
			rewrites: [{
				from: /./,
				to: path.posix.join('/', 'index.html')
			}]
		},
		proxy: {}, // https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
		overlay: {
			warnings: false,
			errors: true
		},
		contentBase: path.join(process.cwd(), 'public')
	}
})
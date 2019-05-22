const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	output: {
		publicPath: '/',
		globalObject: 'this',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.runtime.esm.js',
			'@': path.resolve(process.cwd(), 'src')
		}
	},
	module: {
		noParse: /^(vue|vue-router)$/,
		rules: [{
			test: /\.vue$/,
			use: {
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: true
					}
				}
			}
		}, {
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}, {
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
					appendTsxSuffixTo: [/\.vue$/]
				}
			}]
		}, {
			test: /\.js$/,
			exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
			use: ['babel-loader']
		}, {
			test: /\.scss$/,
			use: [{
				loader: 'vue-style-loader'
			}, {
				loader: 'css-loader',
				options: {
					importLoaders: 2
				}
			}, {
				loader: 'postcss-loader'
			}, {
				loader: 'sass-loader'
			}]
		}, {
			test: /\.sass$/,
			use: [{
				loader: 'vue-style-loader'
			}, {
				loader: 'css-loader',
				options: {
					importLoaders: 2
				}
			}, {
				loader: 'postcss-loader'
			}, {
				loader: 'sass-loader',
				options: {
					indentedSyntax: true
				}
			}]
		}, {
			test: /\.css$/,
			use: ['vue-style-loader', {
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			}, {
				loader: 'postcss-loader'
			}]
		}, {
			test: /\.hbs$/,
			use: {
				loader: 'handlebars-loader'
			}
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 1,
					name: 'img/[name].[hash:10].[ext]'
				}
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 1,
					name: 'img/[name].[hash:10].[ext]'
				}
			}
		}]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
      css: [],
			template: 'index.hbs',
			filename: 'index.html',
      js: [fs.readFileSync('public/flexible.js')]
		})
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dgram: 'empty',
		process: 'mock',
		setImmediate: false,
		child_process: 'empty'
	},
	optimization: {
		noEmitOnErrors: true
	}
}
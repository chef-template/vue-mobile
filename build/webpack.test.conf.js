const webpack = require('webpack')
const merge = require('webpack-merge')
const ENV = require('./webpack.env.conf')
const Stylish = require('webpack-stylish')
const webpackBaseConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')

module.exports = merge.smart(webpackBaseConfig, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'js/[name].[contenthash:8].js',
		chunkFilename: 'js/[name].[contenthash:8].js',
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [MiniCssExtractPlugin.loader, {
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
			use: [MiniCssExtractPlugin.loader, {
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
			use: [MiniCssExtractPlugin.loader, {
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			}, {
				loader: 'postcss-loader'
			}]
		}]
	},
	plugins: [
		new ManifestPlugin(),
		new webpack.HashedModuleIdsPlugin({
			hashDigest: 'hex'
		}),
		new CleanWebpackPlugin(['dist'], {
			root: process.cwd()
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[id].[contenthash:8].css"
		}),
		new OptimizeCssnanoPlugin({
			sourceMap: false,
			cssnanoOptions: {
				preset: ['default', {
					mergeLonghand: false,
					cssDeclarationSorter: false
				}]
			}
		}),
		new CopyWebpackPlugin([{
			from: './public',
			to: './'
		}]),
		new webpack.DefinePlugin({
			'process.env': Object.assign({
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}, ENV[process.env.NODE_ENV])
		}),
		new Stylish()
	],
	stats: 'none',
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					name: 'vendors',
					chunks: 'initial',
					test: /[\\/]node_modules[\\/]/
				},
				common: {
					minChunks: 2,
					priority: -20,
					name: 'common',
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		}
	}
})
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: './src/jquery-jsonform.js',
	output: {
		library: 'JsonForm',
		libraryTarget: 'var',
		filename: 'jquery-jsonform.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'jquery-jsonform.css',
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env'
							]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					//	Translates CSS into CommonJS
					'css-loader',
					//	Compiles Sass to CSS, using Node Sass by default
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	mode: 'development'
};

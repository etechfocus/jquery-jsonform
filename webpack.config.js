const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/jquery-jsonform.js',
	output: {
		filename: 'jquery-jsonform.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "query-jsonform.css"
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					//	Translates CSS into CommonJS
					"css-loader",
					//	Compiles Sass to CSS, using Node Sass by default
					"sass-loader"
				]
			}
		]
	},
	mode: 'development'
};

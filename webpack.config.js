const path = require('path');

module.exports = {
	entry: './src/jquery-jsonform.js',
	output: {
		filename: 'jquery-jsonform.min.js',
		path: path.resolve(__dirname, 'dist')
	},
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
					//	Creates style nodes from JS strings
					"style-loader",
					//	Translates CSS into CommonJS
					"css-loader",
					//	Compiles Sass to CSS, using Node Sass by default
					"sass-loader"
				]
			}
		]
	},
	mode: 'development',
	watch: true
};

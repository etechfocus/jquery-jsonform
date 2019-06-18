const path = require('path');

module.exports = {
	entry: './dist/jquery-jsonform.js',
	output: {
		filename: 'jquery-jsonform.min.js',
		path: path.resolve(__dirname, 'bundle')
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
			}
		]
	},
	watch: true
};

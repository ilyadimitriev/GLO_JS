const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [`@babel/env`]
					}
				}]
			}
		]
	}
};

var webpack = require("webpack");
var path = require('path');
module.exports = {
	entry: {
		multiStickyBar: "./app/static/js/multiStickyBar.js"
	},
	output: {
		filename: "./app/static/js/[name]-compiled.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
}
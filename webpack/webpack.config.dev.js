const {merge} = require("webpack-merge");
const BaseConfig = require("./webpack.config.base.js");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const localDevRootFolder = path.resolve(__dirname, '../local');

module.exports = merge(BaseConfig, {
    context: localDevRootFolder,
    
	entry: {
		main: ['./index.js']
	},

	devServer: {
        port: 8080,
        hot: true,
		static: {
			directory: localDevRootFolder,
		},
    },

	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: false
			}
		})
	]
});

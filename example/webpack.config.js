const { join } = require('path');

module.exports = {
	context: __dirname,
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: join(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		],
	},
	devServer: {
		contentBase: join(__dirname, 'dist'),
		port: 9000,
		historyApiFallback: true,
	},
};


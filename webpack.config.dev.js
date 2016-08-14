import webpack from 'webpack';
import path from 'path';

export default {
	debug: true, // enables displaying debug information
	devtool: 'cheap-module-eval-source-map', // one of many options for  devtool
	noInfo: false, // webpack will display list of all files that its bundling
	entry: [ // entry points, good place to add middleware
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client?reload=true', // great feature that supports hot relaoding built in, note that it reloads the page if hot module reloading fails.
		'./src/index' // apps actual entry point, this order is critical, this has to be the last file in this array
	],
	target: 'web', // we can set this to 'node', if were using webpack to bundle files in node and that would change the wasy webpack bundles the code
	output: { // tells webpack where it should create the dev bundle
		path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: { // tell the webpack webserver where our code actually is
		contentBase: './src'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),// enables to replace modules without having to do a full browser refresh
		new webpack.NoErrorsPlugin() // keep errors from breaking our hot reloading experience, instead we see a nice error message on the browser
	],
	module: { // this section tells webpack what file types it should handle
		loaders: [
			{test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},// for JS files use babel to transpile the code
			{test: /(\.css)$/, loaders: ['style', 'css']},
			//these are all necessary for file types that bootstrap  utilizes for fonts
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	}
};
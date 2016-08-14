import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3003;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true, // we do not want information on the command line as it runs
	publicPath: config.output.publicPath // public path that we defined within our webpack config
}));

// add the hot reloading middleware
app.use(require('webpack-hot-middleware')(compiler));

// any requests the app recieves, return index.html
app.get('*', function(req, res) {
	res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open(`http://localhost:${port}`);
	}
});
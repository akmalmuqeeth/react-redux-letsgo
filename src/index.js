/*need polyfill for features which cannot be transpiled to ES5. its around 50K minified,
so for production you will have to consider importing only the specific polyfills that are needed*/
import 'babel-polyfill';
import React from 'react';

/*from version React 0.14, react-dom has been split up from core react,
so we need to import react-dom needs anytime we need a render funtion which renders page on the browser*/
import {render} from 'react-dom';

/*when declaring Router , we need to specify what kind of browser history we need
* as in, the URL structure, either hash based or not*/
import {Router, browserHistory} from 'react-router';

import routes from './routes';
import './styles/styles.css';//Webpack can import CSS files too
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render (
	<Router history={browserHistory} routes={routes} />,
	document.getElementById('app')
);
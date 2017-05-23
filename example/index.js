import React from 'react';
import { render } from 'react-dom';
import {
	Switch,
	Route,
} from 'react-router';
import {
	NavLink,
	BrowserRouter as Router,
} from 'react-router-dom';
import * as V from './components';

const Home = () => (
	<nav>
		<ul>
			<li>
				<NavLink to="/vFor">vFor</NavLink>
			</li>
			<li>
				<NavLink to="/vIf">vIf</NavLink>
			</li>
			<li>
				<NavLink to="/vShow">vShow</NavLink>
			</li>
			<li>
				<NavLink to="/vOn">vOn</NavLink>
			</li>
			<li>
				<NavLink to="/vModel">vModel</NavLink>
			</li>
		</ul>
	</nav>
);

const App = () => (
	<Router>
		<div>
			<Home />
			<Switch>
				<Route path="/vFor" component={V.For} />
				<Route path="/vIf" component={V.If} />
				<Route path="/vShow" component={V.Show} />
				<Route path="/vOn" component={V.On} />
				<Route path="/vModel" component={V.Model} />
			</Switch>
		</div>
	</Router>
);

render(<App />, document.getElementById('root'));


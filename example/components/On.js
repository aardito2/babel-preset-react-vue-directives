import React, { Component } from 'react';

export default class On extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
		};
		this.increment = this.increment.bind(this);
	}
	
	increment(event) {
		this.setState({ counter: this.state.counter + 1 });
	}

	render() {
		return (
			<div>
				<button vOn$click="increment">Click to increment</button>
				<p>{this.state.counter}</p>
			</div>
		)
	}
}

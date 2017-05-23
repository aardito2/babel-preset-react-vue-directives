import React, { Component } from 'react';

export default class Model extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
		};
	}
	
	render() {
		return (
			<div>
				<input vModel="inputValue" />
				<p>this.state.inputValue:</p>
				<p>{this.state.inputValue}</p>
			</div>
		);
	}
}


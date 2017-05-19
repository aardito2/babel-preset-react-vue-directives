import React, { Component } from 'react';

export default class InputTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return (
			<input vModel={inputValue} />
		);
	}
}


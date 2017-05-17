import React, { Component } from 'react';

export default class CheckboxTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return (
			<input vModel="inputValue" />
		);
	}
}


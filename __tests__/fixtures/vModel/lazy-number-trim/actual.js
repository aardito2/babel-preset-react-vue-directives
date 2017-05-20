import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return (
			<input vModel$lazy$number$trim="inputValue" />
		);
	}
}


import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}

	render() {
		return (
			<input type="checkbox" vModel="isChecked" />
		);
	}
}

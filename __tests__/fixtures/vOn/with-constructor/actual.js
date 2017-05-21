import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {}

	render() {
		return (
			<button vOn$click="handleClick" />
		);
	}
}


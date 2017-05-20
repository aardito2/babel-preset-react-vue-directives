import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	render() {
		return (
			<button vOn$keyUpEnter="handleClick" />
		);
	}
}


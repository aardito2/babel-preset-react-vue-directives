import React, { Component } from 'react';

export default class Test extends Component {
	handleKeyUp(event) {}

	render() {
		return (
			<button vOn$keyUpEnter="handleKeyUp" />
		);
	}
}


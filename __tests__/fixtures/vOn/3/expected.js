import React, { Component } from 'react';

export default class Test extends Component {
	handleKeyPress(event) {}

	render() {
		return <button onKeyPress={event => {
			if (event.keyCode === 13 && event.ctrlKey) {
				handleKeyPress(event);
			}
		}} />;
	}
}


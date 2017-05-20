import React, { Component } from 'react';

export default class Test extends Component {
	handleKeyDown(event) {}

	render() {
		return <button onKeyDownCapture={event => {
			if (event.keyCode === 13) {
				handleKeyDown(event);
			}
		}} />;
	}
}


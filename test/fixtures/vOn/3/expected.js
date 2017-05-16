import React, { Component } from 'react';

export default class CheckboxTest extends Component {
	handleClick(event) {}

	render() {
		return <button onKeyPress={event => {
			if (event.keyCode === 13 && event.ctrlKey) {
				handleClick(event);
			}
		}} />;
	}
}


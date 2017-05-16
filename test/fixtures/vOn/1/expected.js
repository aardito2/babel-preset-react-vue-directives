import React, { Component } from 'react';

export default class CheckboxTest extends Component {
	handleClick(event) {}

	render() {
		return <button onClick={event => {
			event.preventDefault();event.stopPropagation();if (event.buttons & 1) {
				handleClick(event);
			}
		}} />;
	}
}


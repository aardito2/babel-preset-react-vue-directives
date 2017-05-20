import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	render() {
		return <button onClick={event => {
			event.preventDefault();event.stopPropagation();if (event.buttons & 4) {
				handleClick(event);
			}
		}} />;
	}
}


import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	render() {
		return <button onKeyUp={event => {
			if (event.keyCode === 13) {
				handleClick(event);
			}
		}} />;
	}
}


import React, { Component } from 'react';

export default class CheckboxTest extends Component {
	handleClick(event) {}

	render() {
		return (
			<button vOn$invalid$prevent$stop$left="handleClick" />
		);
	}
}


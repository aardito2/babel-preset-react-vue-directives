import React, { Component } from 'react';

export default class CheckboxTest extends Component {
	handleClick(event) {}

	render() {
		return (
			<button vOn$click$prevent$stop$left={handleClick} />
		);
	}
}


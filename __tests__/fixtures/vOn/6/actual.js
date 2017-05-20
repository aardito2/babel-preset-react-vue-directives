import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	render() {
		return (
			<button vOn$click$prevent$stop$right="handleClick" />
		);
	}
}


import React, { Component } from 'react';

export default class Test extends Component {
	handleKeyDown(event) {}

	render() {
		return (
			<button vOn$keyDown13$capture="handleKeyDown" />
		);
	}
}


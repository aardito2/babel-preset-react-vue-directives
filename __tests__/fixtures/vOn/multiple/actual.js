import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	handleContextMenu(event) {}

	render() {
		return (
			<button
				vOn$click="handleClick"
				vOn$contextMenu="handleContextMenu"
			/>
		);
	}
}


import React, { Component } from 'react';

export default class Test extends Component {
	handleContextMenu(event) {}

	render() {
		return (
			<button vOn$contextMenu="handleContextMenu" />
		);
	}
}


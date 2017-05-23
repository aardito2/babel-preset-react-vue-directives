import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleContextMenu = this._handleContextMenu.bind(this);
	}

	handleContextMenu(event) {}

	render() {
		return <button onContextMenu={this._handleContextMenu} />;
	}

	_handleContextMenu(event) {
		this.handleContextMenu(event);
	}

}


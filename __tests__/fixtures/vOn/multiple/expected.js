import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
		this._handleContextMenu = this._handleContextMenu.bind(this);
	}

	handleClick(event) {}

	handleContextMenu(event) {}

	render() {
		return <button onClick={this._handleClick} onContextMenu={this._handleContextMenu} />;
	}

	_handleClick(event) {
		this.handleClick(event);
	}

	_handleContextMenu(event) {
		this.handleContextMenu(event);
	}

}


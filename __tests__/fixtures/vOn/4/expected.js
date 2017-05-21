import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleKeyDown = this._handleKeyDown.bind(this);
	}

	handleKeyDown(event) {}

	render() {
		return <button onKeyDownCapture={this._handleKeyDown} />;
	}

	_handleKeyDown(event) {
		if (event.keyCode === 13) {
			this.handleKeyDown(event);
		}
	}

}


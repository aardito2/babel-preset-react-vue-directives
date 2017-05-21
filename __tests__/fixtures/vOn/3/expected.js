import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleKeyPress = this._handleKeyPress.bind(this);
	}

	handleKeyPress(event) {}

	render() {
		return <button onKeyPress={this._handleKeyPress} />;
	}

	_handleKeyPress(event) {
		if (event.keyCode === 13 && event.ctrlKey) {
			this.handleKeyPress(event);
		}
	}

}


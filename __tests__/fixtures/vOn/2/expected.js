import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleKeyUp = this._handleKeyUp.bind(this);
	}

	handleKeyUp(event) {}

	render() {
		return <button onKeyUp={this._handleKeyUp} />;
	}

	_handleKeyUp(event) {
		if (event.keyCode === 13) {
			this.handleKeyUp(event);
		}
	}

}


import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	handleClick(event) {}

	render() {
		return <button onClick={this._handleClick} />;
	}

	_handleClick(event) {
		this.handleClick(event);
	}

}


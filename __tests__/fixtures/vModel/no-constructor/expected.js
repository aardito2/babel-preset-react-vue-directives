import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._handleInputInputValue = this._handleInputInputValue.bind(this);
	}

	render() {
		return <input onInput={this._handleInputInputValue} value={this.state.inputValue} />;
	}

	_handleInputInputValue(event) {
		this.setState({
			inputValue: event.target.value
		});
	}

}


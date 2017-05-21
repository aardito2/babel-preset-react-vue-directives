import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
		this._handleChangeInputValue = this._handleChangeInputValue.bind(this);
	}

	render() {
		return <input onChange={this._handleChangeInputValue} value={this.state.inputValue} />;
	}

	_handleChangeInputValue(event) {
		this.setState({
			inputValue: Number(event.target.value.trim())
		});
	}

}


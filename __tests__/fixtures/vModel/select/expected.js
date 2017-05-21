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
		return <select onChange={this._handleChangeInputValue} value={this.state.inputValue}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>;
	}

	_handleChangeInputValue(event) {
		this.setState({
			inputValue: event.target.value
		});
	}

}


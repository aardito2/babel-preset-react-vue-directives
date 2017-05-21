import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
		this._handleChangeIsChecked = this._handleChangeIsChecked.bind(this);
	}

	render() {
		return <input type="checkbox" onChange={this._handleChangeIsChecked} checked={this.state.isChecked} />;
	}

	_handleChangeIsChecked(event) {
		this.setState({
			isChecked: event.target.checked
		});
	}

}


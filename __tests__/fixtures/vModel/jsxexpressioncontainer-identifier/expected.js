import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return <input onInput={event => this.setState({
			inputValue: event.target.value
		})} value={this.state.inputValue} />;
	}
}


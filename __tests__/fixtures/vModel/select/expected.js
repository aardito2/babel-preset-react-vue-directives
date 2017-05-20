import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return <select onChange={event => this.setState({
			inputValue: event.target.value
		})} value={this.state.inputValue}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>;
	}
}


import React, { Component } from 'react';

export default class Test extends Component {
	render() {
		return (
			<button vOn$click={function(event) { this.setState({ value: event.target.value })}} />
		);
	}
}


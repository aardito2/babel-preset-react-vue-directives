import React, { Component } from 'react';

export default class Test extends Component {
	handleClick(event) {}

	render() {
		return (
			<button vOn$click={handleClick + 2} />
		);
	}
}


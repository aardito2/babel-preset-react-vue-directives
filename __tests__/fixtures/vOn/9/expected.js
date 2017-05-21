import React, { Component } from 'react';

export default class Test extends Component {
	render() {
		return <button onClick={event => {
			(function (event) {
				this.setState({ value: event.target.value });
			})(event);
		}} />;
	}
}


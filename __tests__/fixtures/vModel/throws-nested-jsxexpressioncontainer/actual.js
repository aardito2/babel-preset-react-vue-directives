import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			a: {
				b: {
					c: {
						inputValue: ''
					}
				}
			}
		};
	}

	render() {
		return (
			<input vModel={a.b.c.inputValue} />
		);
	}
}


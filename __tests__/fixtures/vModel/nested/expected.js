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
		return <input onInput={event => this.setState(Object.assign({}, this.state, {
			a: Object.assign({}, this.state.a, {
				b: Object.assign({}, this.state.a.b, {
					c: Object.assign({}, this.state.a.b.c, {
						inputValue: event.target.value
					})
				})
			})
		}))} value={this.state.a.b.c.inputValue} />;
	}
}


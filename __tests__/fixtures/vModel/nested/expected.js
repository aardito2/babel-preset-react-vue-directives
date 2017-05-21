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
		this._handleInputABCInputValue = this._handleInputABCInputValue.bind(this);
	}

	render() {
		return <input onInput={this._handleInputABCInputValue} value={this.state.a.b.c.inputValue} />;
	}

	_handleInputABCInputValue(event) {
		this.setState({
			a: Object.assign({}, this.state.a, {
				b: Object.assign({}, this.state.a.b, {
					c: Object.assign({}, this.state.a.b.c, {
						inputValue: event.target.value
					})
				})
			})
		});
	}

}


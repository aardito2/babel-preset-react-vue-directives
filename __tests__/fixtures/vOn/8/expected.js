import React, { Component } from 'react';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this._propsHandleClick = this._propsHandleClick.bind(this);
	}

	render() {
		return <button onClick={this._propsHandleClick} />;
	}

	_propsHandleClick(event) {
		this.props.handleClick(event);
	}

}


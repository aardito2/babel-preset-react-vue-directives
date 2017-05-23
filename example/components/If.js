import React, { Component } from 'react';

export default class Show extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showA: true,
			showB: false,
			showC: false,
		}
	}
	
	render() {
		return (
			<div>
				<label htmlFor="showA">Show A?</label>
				<input
					type="checkbox"
					vModel="showA"
					name="showA"
				/>
				<br />
				<label htmlFor="showB">Show B?</label>
				<input
					type="checkbox"
					vModel="showB"
					name="showB"
				/>
				<br />
				<label htmlFor="showC">Show C?</label>
				<input
					type="checkbox"
					vModel="showC"
					name="showC"
				/>
				<br />
				<div vIf={this.state.showA}>A</div>
				<div vElseIf={this.state.showB}>B</div>
				<div vElseIf={this.state.showC}>C</div>
				<div vElse>None shown</div>
			</div>
		);
	}
}


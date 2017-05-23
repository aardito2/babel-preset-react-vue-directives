import React, { Component } from 'react';

export default class Show extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showA: true,
			showB: false,
			showC: false,
		};
	}
	
	render() {
		return (
			<div>
				<p>
					<label htmlFor="showA">Show A?</label>
					<input
						type="checkbox"
						vModel="showA"
						name="showA"
					/>
				</p>
				<div vShow="this.state.showA">A</div>
				<p>
					<label htmlFor="showB">Show B?</label>
					<input
						type="checkbox"
						vModel="showB"
						name="showB"
					/>
				</p>
				<div vShow="this.state.showB">B</div>
				<p>
					<label htmlFor="showC">Show C?</label>
					<input
						type="checkbox"
						vModel="showC"
						name="showC"
					/>
				</p>
				<div vShow="this.state.showC">C</div>
			</div>
		)
	}
}

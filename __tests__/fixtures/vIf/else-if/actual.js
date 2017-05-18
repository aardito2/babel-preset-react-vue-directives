import React from 'react';

export default () => (
	<div>
		<div vIf="cond">if</div>
		<div vElseIf={condElseIf > 0}>elseIf</div>
		<div vElseIf="condElseIf2">elseIf2</div>
		<div vElse>else</div>
	</div>
);


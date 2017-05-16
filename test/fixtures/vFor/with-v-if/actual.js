import React from 'react';

export default () => (
	<ul>
		<li vFor="element in arrOrObj" vIf="cond">
			{element.property}
		</li>
	</ul>
);

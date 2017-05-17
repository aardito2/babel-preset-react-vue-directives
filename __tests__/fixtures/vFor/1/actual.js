import React from 'react';

export default () => (
	<ul>
		<li vFor="element in arrOrObj">
			{element.property}
		</li>
	</ul>
);

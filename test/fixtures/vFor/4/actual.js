import React from 'react';

export default () => (
	<ul>
		<li vFor="(element, elIdxOrKey) in arrOrObj">
			{element.property}
		</li>
	</ul>
);


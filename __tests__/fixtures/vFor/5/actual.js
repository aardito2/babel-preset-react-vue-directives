import React from 'react';

export default () => (
	<ul>
		<li vFor="element in arrOrObj" key={element.id}>
			{element.property}
		</li>
	</ul>
);

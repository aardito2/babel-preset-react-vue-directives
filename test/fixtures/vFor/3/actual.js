import React from 'react';

export default () => (
	<ul>
		<li vFor="(objValue, objKey, objIndex) in obj">
			{objIndex}. {objKey}:{objValue}
		</li>
	</ul>
);


import React from 'react';

export default (() => <ul>
		{Object.keys(obj).map((objKey, objIndex) => ({
		objKey,
		objValue: obj[objKey],
		objIndex
	})).map(({
		objKey,
		objValue,
		objIndex
	}) => <li key={objKey}>
			{objIndex}. {objKey}:{objValue}
		</li>)}
	</ul>);


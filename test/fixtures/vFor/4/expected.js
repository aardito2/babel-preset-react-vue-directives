import React from 'react';

export default (() => <ul>
		{Array.isArray(arrOrObj) ? arrOrObj.map((element, elIdxOrKey) => <li key={elIdxOrKey !== undefined ? elIdxOrKey : _idx}>
			{element.property}
		</li>) : Object.keys(arrOrObj).map((elIdxOrKey) => ({
		elIdxOrKey,
		element: arrOrObj[elIdxOrKey]
	})).map(({
		elIdxOrKey,
		element
	}) => <li key={elIdxOrKey !== undefined ? elIdxOrKey : _idx}>
			{element.property}
		</li>)}
	</ul>);


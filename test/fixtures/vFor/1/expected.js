import React from 'react';

export default (() => <ul>
		{Array.isArray(arrOrObj) ? arrOrObj.map((element, _idx) => <li key={_idx !== undefined ? _idx : _key}>
			{element.property}
		</li>) : Object.keys(arrOrObj).map((_key) => ({
		_key,
		element: arrOrObj[_key]
	})).map(({
		_key,
		element
	}) => <li key={_idx !== undefined ? _idx : _key}>
			{element.property}
		</li>)}
	</ul>);

import React from 'react';

export default (() => <ul>
		{Array.isArray(arrOrObj) ? arrOrObj.map((element, _idx) => <div>{cond ? <li key={_idx !== undefined ? _idx : _key}>
			{element.property}
		</li> : null}</div>) : Object.keys(arrOrObj).map((_key) => ({
		_key,
		element: arrOrObj[_key]
	})).map(({
		_key,
		element
	}) => <div>{cond ? <li key={_idx !== undefined ? _idx : _key}>
			{element.property}
		</li> : null}</div>)}
	</ul>);

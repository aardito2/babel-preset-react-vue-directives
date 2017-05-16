import React from 'react';

export default (() => <ul>
		{Array.isArray(arrOrObj) ? arrOrObj.map((element, _idx) => <li key={element.id}>
			{element.property}
		</li>) : Object.keys(arrOrObj).map((_key) => ({
		_key,
		element: arrOrObj[_key]
	})).map(({
		_key,
		element
	}) => <li key={element.id}>
			{element.property}
		</li>)}
	</ul>);

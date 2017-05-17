import React from 'react';

export default (() => <div>
		{cond ? <div>if</div> : condElseIf ? <div>elseIf</div> : condElseIf2 ? <div>elseIf2</div> : <div>else</div>}
	</div>);


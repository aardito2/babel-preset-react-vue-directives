import React from 'react';

export default (() => <div>
		{cond ? <div>if</div> : condElseIf > 0 ? <div>elseIf</div> : condElseIf2 ? <div>elseIf2</div> : <div>else</div>}
	</div>);


import vFor from './plugins/vFor';
import vIf from './plugins/vIf';
import vElseError from './plugins/vElseError';
import vModel from './plugins/vModel';
import vModelError from './plugins/vModelError';
import vShow from './plugins/vShow';
import vOn from './plugins/vOn';
import vOnError from './plugins/vOnError';

export default {
	plugins: [
		vFor,
		vIf,
		vElseError,
		vShow,
		vModel,
		vModelError,
		vOn,
		vOnError,
	],
};

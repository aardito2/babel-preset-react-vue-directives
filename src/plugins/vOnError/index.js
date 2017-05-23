import syntaxJsx from 'babel-plugin-syntax-jsx';
import { throwAttributeError } from '../shared';

export default function () {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

					if (vOn) {
						throwAttributeError(path, vOn, 'Class component is required for vOn');
					}
				}
			},
		},
	};
}


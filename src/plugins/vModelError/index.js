import syntaxJsx from 'babel-plugin-syntax-jsx';
import { throwAttributeError } from '../shared';

export default function () {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vModel = path.node.openingElement.attributes.find(attr => /^vModel(\$\w+)*$/.test(attr.name.name));

					if (vModel) {
						throwAttributeError(path, vModel, 'Class component is required for vModel');
					}
				}
			},
		},
	};
}


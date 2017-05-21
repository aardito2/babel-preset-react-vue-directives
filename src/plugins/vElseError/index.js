import syntaxJsx from 'babel-plugin-syntax-jsx';
import { throwAttributeError } from '../shared';

// makes a second pass after vIf runs and throws if any vElse or vIf attributes are found
export default function () {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vElse = path.node.openingElement.attributes.find(attr => attr.name.name === 'vElse' || attr.name.name === 'vElseIf');

					if (vElse) {
						throwAttributeError(path, vElse, `${vElse.name.name} without corresponding vIf`);
					}
				}
			},
		},
	};
}


import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVFor from './handleVFor';
import { throwAttributeError } from '../shared';

export default function ({ types: t, template }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vFor = path.node.openingElement.attributes.find(attr => attr.name.name === 'vFor');

					if (vFor) {
						if (t.isStringLiteral(vFor.value)) {
							handleVFor(t, path, vFor, template);
						} else {
							throwAttributeError(path, vFor, 'Invalid vFor attribute value; expected string literal');
						}
					}
				}
			},
		},
	};
}


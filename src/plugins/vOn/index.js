import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';
import { throwAttributeError, getClassBodyPath } from '../shared';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

					if (vOn) {
						const classBodyPath = getClassBodyPath(path);
						if (!classBodyPath) {
							throwAttributeError(path, vOn, 'Class component is required for vOn');
						}

						if (t.isStringLiteral(vOn.value)) {
							handleVOn(t, path, classBodyPath, vOn);
						} else if (t.isJSXExpressionContainer(vOn.value) &&
							(t.isIdentifier(vOn.value.expression) ||
							t.isMemberExpression(vOn.value.expression))) {
							handleVOn(t, path, classBodyPath, vOn, true);
						} else {
							throwAttributeError(path, vOn, 'Invalid vOn attribute value; expected string literal or curly brace expression containing an identifier');
						}
					}
				}
			},
		},
	};
}


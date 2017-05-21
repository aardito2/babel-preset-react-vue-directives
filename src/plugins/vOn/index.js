import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';
import errorVisitor from '../shared/errorVisitor';

const errorMsg = 'Invalid vOn attribute value; expected string literal or curly brace expression containing an identifier or a function';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

					if (vOn) {
						if (t.isStringLiteral(vOn.value)) {
							handleVOn(t, path, vOn);
						} else if (t.isJSXExpressionContainer(vOn.value)) {
							if (t.isIdentifier(vOn.value.expression) ||
								t.isArrowFunctionExpression(vOn.value.expression) ||
								t.isFunctionExpression(vOn.value.expression)) {
								handleVOn(t, path, vOn, true);
							} else {
								errorVisitor(vOn, path, 'JSXAttribute', errorMsg);
							}
						} else {
							errorVisitor(vOn, path, 'JSXAttribute', errorMsg);
						}
					}
				}
			},
		},
	};
}


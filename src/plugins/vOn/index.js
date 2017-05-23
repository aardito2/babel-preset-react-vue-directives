import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';
import { throwAttributeError } from '../shared';

const elementVisitor = {
	JSXElement(path) {
		const { t, classBodyPath } = this;

		if (path.node.openingElement.attributes.length) {
			const vOns = path.node.openingElement.attributes.filter(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

			if (vOns.length) {
				vOns.forEach(vOn => {
					if (t.isStringLiteral(vOn.value)) {
						handleVOn(t, path, classBodyPath, vOn);
					} else if (t.isJSXExpressionContainer(vOn.value) &&
						(t.isIdentifier(vOn.value.expression) ||
							t.isMemberExpression(vOn.value.expression))) {
						handleVOn(t, path, classBodyPath, vOn, true);
					} else {
						throwAttributeError(path, vOn, 'Invalid vOn attribute value; expected string literal or curly brace expression containing an identifier');
					}
				});
			}
		}
	},
};

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			ClassBody(path) {
				path.traverse(elementVisitor, { t, classBodyPath: path });
			},
		},
	};
}


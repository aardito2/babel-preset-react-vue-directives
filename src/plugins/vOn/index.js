import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';
import errorVisitor from '../shared/errorVisitor';

const elementVisitor = {
	JSXElement(path) {
		const { t, classBodyPath } = this;

		if (path.node.openingElement.attributes.length) {
			const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

			if (vOn) {
				if (t.isStringLiteral(vOn.value)) {
					handleVOn(t, path, classBodyPath, vOn);
				} else if (t.isJSXExpressionContainer(vOn.value) && t.isIdentifier(vOn.value.expression)) {
					handleVOn(t, path, classBodyPath, vOn, true);
				} else {
					errorVisitor(vOn, path, 'JSXAttribute', 'Invalid vOn attribute value; expected string literal or curly brace expression containing an identifier');
				}
			}
		}
	},
};

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			ClassBody(path) {
				path.traverse(elementVisitor, { classBodyPath: path, t });
			},
		},
	};
}


import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';
import errorVisitor from '../shared/errorVisitor';

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
							t.assertIdentifier(vOn.value.expression);
							handleVOn(t, path, vOn, true);
						}else {
							errorVisitor(vOn, path, 'JSXAttribute', 'Invalid vOn attribute value; expected string literal or curly brace expression containing an identifier');
						}
					}
				}
			},
		},
	};
}


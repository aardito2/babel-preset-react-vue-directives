import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVModel from './handleVModel';
import errorVisitor from '../shared/errorVisitor';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vModel = path.node.openingElement.attributes.find(attr => /^vModel(\$\w+)*$/.test(attr.name.name));

					if (vModel) {
						if (t.isStringLiteral(vModel.value)) {
							handleVModel(t, path, vModel);
						} else if (t.isJSXExpressionContainer(vModel.value)) {
							t.assertIdentifier(vModel.value.expression);
							handleVModel(t, path, vModel, true);
						} else {
							errorVisitor(vModel, path, 'JSXAttribute', 'Invalid vModel attribute value; expected string literal or curly brace expression containing an identifier');
						}
					}
				}
			},
		},
	};
}


import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVModel from './handleVModel';
import { throwAttributeError } from '../shared';

const elementVisitor = {
	JSXElement(path) {
		const { t, classBodyPath } = this;

		if (path.node.openingElement.attributes.length) {
			const vModel = path.node.openingElement.attributes.find(attr => /^vModel(\$\w+)*$/.test(attr.name.name));

			if (vModel) {
				if (t.isStringLiteral(vModel.value)) {
					handleVModel(t, path, classBodyPath, vModel);
				} else if (t.isJSXExpressionContainer(vModel.value)) {
					t.assertIdentifier(vModel.value.expression);
					handleVModel(t, path, classBodyPath, vModel, true);
				} else {
					throwAttributeError(path, vModel, 'Invalid vModel attribute value; expected string literal or curly brace expression containing an identifier');
				}
			}
		}
	},
};

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			ClassDeclaration(path) {
				path.traverse(elementVisitor, { t, classBodyPath: path.get('body') });
			},
		},
	};
}


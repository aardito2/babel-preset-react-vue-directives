import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVModel from './handleVModel';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vModel = path.node.openingElement.attributes.find(attr => attr.name.name === 'vModel');

					if (vModel && t.isStringLiteral(vModel.value)) {
						handleVModel(t, path, vModel);
					}
				}
			},
		},
	};
}

import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVModel from './handleVModel';

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
						} else {
							return path.buildCodeFrameError('Invalid vModel attribute value; expected string literal');
						}
					}
				}
			},
		},
	};
}


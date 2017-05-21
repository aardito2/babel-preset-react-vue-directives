import syntaxJsx from 'babel-plugin-syntax-jsx';
import errorVisitor from '../shared/errorVisitor';

export default function () {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vModel = path.node.openingElement.attributes.find(attr => /^vModel(\$\w+)*$/.test(attr.name.name));

					if (vModel) {
						errorVisitor(vModel, path, 'JSXAttribute', 'vModel requires class component');
					}
				}
			},
		},
	};
}


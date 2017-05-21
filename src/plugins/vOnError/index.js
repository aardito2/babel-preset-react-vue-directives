import syntaxJsx from 'babel-plugin-syntax-jsx';
import errorVisitor from '../shared/errorVisitor';

export default function () {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

					if (vOn) {
						errorVisitor(vOn, path, 'JSXAttribute', 'vOn requires class component');
					}
				}
			},
		},
	};
}


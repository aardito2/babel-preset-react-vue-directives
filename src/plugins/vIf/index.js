import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVIf from './handleVIf';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vIf = path.node.openingElement.attributes.find(attr => attr.name.name === 'vIf');

					vIf && handleVIf(t, path, vIf);
				}
			},
		},
	};
}


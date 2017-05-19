import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVOn from './handleVOn';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => /^vOn(\$\w+)+$/.test(attr.name.name));

					if (vOn && t.isStringLiteral(vOn.value)) {
						handleVOn(t, path, vOn);
					}
				}
			},
		},
	};
}


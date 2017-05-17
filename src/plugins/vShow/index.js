import syntaxJsx from 'babel-plugin-syntax-jsx';
import handleVShow from './handleVShow';

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vShow = path.node.openingElement.attributes.find(attr => attr.name.name === 'vShow');

					if (vShow && t.isStringLiteral(vShow.value)) {
						handleVShow(t, path, vShow);
					}
				}
			},
		},
	};
}


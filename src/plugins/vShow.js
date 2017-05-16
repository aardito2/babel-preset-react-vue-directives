import syntaxJsx from 'babel-plugin-syntax-jsx';
import parseCondition from './parseCondition';

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

function createDisplayProp(condition, showValue, t) {
	return t.ObjectProperty(
		t.identifier('display'),
		t.ConditionalExpression(
			condition,
			showValue,
			t.StringLiteral('none'),
		),
	);
}

function handleVShow(t, path, vShow) {
	const condition = parseCondition(vShow.value.value, t);

	path.node.openingElement.attributes = path.node.openingElement.attributes
		.filter(attr => attr !== vShow);

	const styleAttr = path.node.openingElement.attributes.find(attr => attr.name.name === 'style');
	if (styleAttr) {
		const styleProps = styleAttr.value.expression.properties;
		const displayProp = styleProps.find(prop => prop.key.name === 'display');
		if (displayProp) {
			displayProp.value = t.ConditionalExpression(
				condition,
				displayProp.value,
				t.StringLiteral('none'),
			);
		} else {
			styleProps.push(createDisplayProp(condition, t.NullLiteral(), t));
		}
	} else {
		path.node.openingElement.attributes.push(
			t.JSXAttribute(
				t.JSXIdentifier('style'),
				t.JSXExpressionContainer(
					t.ObjectExpression([
						createDisplayProp(condition, t.NullLiteral(), t),
					]),
				),
			),
		);
	}
}

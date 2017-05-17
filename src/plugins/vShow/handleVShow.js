import { createDisplayProp } from './helpers';
import parseCondition from '../shared/parseCondition';

export default function handleVShow(t, path, vShow) {
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

import { createDisplayProp } from './helpers';
import { parseCondition, removeAttributeVisitor } from '../shared';

export default function handleVShow(t, path, vShow) {
	const condition = parseCondition(vShow, t);

	removeAttributeVisitor(path, vShow);

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
		path.get('openingElement').pushContainer('attributes', t.JSXAttribute(
			t.JSXIdentifier('style'),
			t.JSXExpressionContainer(
				t.ObjectExpression([
					createDisplayProp(condition, t.NullLiteral(), t),
				]),
			),
		));
	}
}

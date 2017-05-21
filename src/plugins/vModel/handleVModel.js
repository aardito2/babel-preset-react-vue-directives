import createSetStateArg from './helpers';
import { capitalize } from '../shared/util';
import removeAttributeVisitor from '../shared/removeAttributeVisitor';
import findOrCreateConstructor from '../shared/findOrCreateConstructor';
import bindMethodInConstructor from '../shared/bindMethodInConstructor';

export default function handleVModel(
	t,
	path,
	classBodyPath,
	vModel,
	isJSXExpressionContainer = false,
) {
	const name = vModel.name.name.split('$').slice(1);
	const value = isJSXExpressionContainer ?
		vModel.value.expression.name :
		vModel.value.value;

	const hasLazy = name.includes('lazy');
	const hasNumber = name.includes('number');
	const hasTrim = name.includes('trim');

	const type = path.node.openingElement.name.name;

	let eventProp = 'value';
	let eventHandler = 'onInput';

	removeAttributeVisitor(path, vModel);

	if (hasLazy) {
		eventHandler = 'onChange';
	}

	if (type === 'input') {
		const attr = path.node.openingElement.attributes.find(nodeAttr => nodeAttr.name.name === 'type');

		if (attr) {
			if (attr.value.value === 'checkbox' || attr.value.value === 'radio') {
				eventHandler = 'onChange';
			}

			if (attr.value.value === 'checkbox') {
				eventProp = 'checked';
			}
		}
	} else if (type === 'select') {
		eventHandler = 'onChange';
	}

	const constructorPath = findOrCreateConstructor(classBodyPath, t);

	let methodName = eventHandler.replace('on', 'handle');
	methodName += value[0].toUpperCase();
	methodName += value.slice(1).split('.').map((str, i) => {
		return i ? capitalize(str) : str;
	}).join('');

	methodName = classBodyPath.scope.generateUidIdentifier(methodName).name;

	bindMethodInConstructor(constructorPath, methodName, t);

	classBodyPath.pushContainer('body', t.ClassMethod(
		'method',
		t.Identifier(methodName),
		[t.Identifier('event')],
		t.BlockStatement([
			t.ExpressionStatement(
				t.CallExpression(
					t.MemberExpression(
						t.ThisExpression(),
						t.Identifier('setState'),
					),
					[createSetStateArg(hasNumber, hasTrim, value, eventProp, t)],
				),
			),
		]),
	));

	path.get('openingElement').pushContainer('attributes', t.JSXAttribute(
		t.JSXIdentifier(eventHandler),
		t.JSXExpressionContainer(
			t.MemberExpression(
				t.ThisExpression(),
				t.Identifier(methodName),
			),
		),
	));

	path.get('openingElement').pushContainer('attributes', t.JSXAttribute(
		t.JSXIdentifier(eventProp),
		t.JSXExpressionContainer(
			t.MemberExpression(
				t.MemberExpression(
					t.ThisExpression(),
					t.Identifier('state'),
				),
				t.Identifier(value),
			),
		),
	));
}


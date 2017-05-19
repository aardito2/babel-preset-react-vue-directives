import createSetStateArg from './helpers';

export default function handleVModel(t, path, vModel) {
	const type = path.node.openingElement.name.name;

	let eventProp = 'value';
	let eventHandler = 'onInput';

	path.node.openingElement.attributes = path.node.openingElement.attributes
		.filter(attr => attr !== vModel);

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

	path.node.openingElement.attributes.push(
		t.JSXAttribute(
			t.JSXIdentifier(eventHandler),
			t.JSXExpressionContainer(
				t.ArrowFunctionExpression(
					[t.identifier('event')],
					t.CallExpression(
						t.MemberExpression(
							t.ThisExpression(),
							t.Identifier('setState'),
						),
						[createSetStateArg(vModel.value.value, eventProp, t)]
					),
				),
			),
		),
	);

	path.node.openingElement.attributes.push(
		t.JSXAttribute(
			t.JSXIdentifier(eventProp),
			t.JSXExpressionContainer(
				t.MemberExpression(
					t.MemberExpression(
						t.ThisExpression(),
						t.Identifier('state'),
					),
					t.Identifier(vModel.value.value),
				),
			),
		),
	);
}


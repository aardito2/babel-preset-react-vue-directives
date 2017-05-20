import { parse } from 'babylon';

const stateTemplate = path => parse(`this.state${path ? `.${path}` : ''}`).program.body[0].expression;

function createEventExpression(hasNumber, hasTrim, eventProp, t) {
	let val = t.MemberExpression(
		t.MemberExpression(
			t.Identifier('event'),
			t.Identifier('target'),
		),
		t.Identifier(eventProp),
	);

	if (hasTrim) {
		val = t.CallExpression(
			t.MemberExpression(
				val,
				t.Identifier('trim'),
			),
			[],
		);
	}

	if (hasNumber) {
		val = t.CallExpression(
			t.Identifier('Number'),
			[val],
		);
	}

	return val;
}

export default function createSetStateArg(hasNumber, hasTrim, identifier, eventProp, t, path = '') {
	const keys = identifier.split('.');

	if (keys.length === 1 && path) {
		return t.CallExpression(
			t.MemberExpression(
				t.Identifier('Object'),
				t.Identifier('assign'),
			),
			[
				t.ObjectExpression([]),
				stateTemplate(path),
				t.ObjectExpression(
					[
						t.ObjectProperty(
							t.Identifier(keys[0]),
							createEventExpression(hasNumber, hasTrim, eventProp, t),
						),
					],
				),
			],
		);
	}

	if (keys.length === 1) {
		return t.ObjectExpression(
			[
				t.ObjectProperty(
					t.Identifier(keys[0]),
					createEventExpression(hasNumber, hasTrim, eventProp, t),
				),
			],
		);
	}

	if (!path) {
		return t.ObjectExpression(
			[
				t.ObjectProperty(
					t.Identifier(keys[0]),
					createSetStateArg(hasNumber, hasTrim, keys.slice(1).join('.'), eventProp, t, path ? `${path}.${keys[0]}` : keys[0]),
				),
			],
		);
	}

	return t.CallExpression(
		t.MemberExpression(
			t.Identifier('Object'),
			t.Identifier('assign'),
		),
		[
			t.ObjectExpression([]),
			stateTemplate(path),
			t.ObjectExpression(
				[
					t.ObjectProperty(
						t.Identifier(keys[0]),
						createSetStateArg(hasNumber, hasTrim, keys.slice(1).join('.'), eventProp, t, path ? `${path}.${keys[0]}` : keys[0]),
					),
				],
			),
		],
	);
}

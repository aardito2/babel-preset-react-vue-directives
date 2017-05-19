import { parse } from 'babylon';

const stateTemplate = path => parse(`this.state${path ? '.' + path : ''}`).program.body[0].expression;

export default function createSetStateArg(identifier, eventProp, t, path = '') {
	let keys = identifier.split('.');

	if (keys.length === 1 && path) {
		return t.CallExpression(
			t.MemberExpression(
				t.Identifier('Object'),
				t.Identifier('assign')
			),
			[
				t.ObjectExpression([]),
				stateTemplate(path),
				t.ObjectExpression(
					[
						t.ObjectProperty(
							t.Identifier(keys[0]),
							t.MemberExpression(
								t.MemberExpression(
									t.Identifier('event'),
									t.Identifier('target'),
								),
								t.Identifier(eventProp),
							),
						)
					]
				)
			]
		);
	} 

	if (keys.length === 1) {
		return t.ObjectExpression(
			[
				t.ObjectProperty(
					t.Identifier(keys[0]),
					t.MemberExpression(
						t.MemberExpression(
							t.Identifier('event'),
							t.Identifier('target'),
						),
						t.Identifier(eventProp),
					),
				)
			],
		);
	};

	return t.CallExpression(
		t.MemberExpression(
			t.Identifier('Object'),
			t.Identifier('assign')
		),
		[
			t.ObjectExpression([]),
			stateTemplate(path),
			t.ObjectExpression(
				[
					t.ObjectProperty(
						t.Identifier(keys[0]),
						createSetStateArg(keys.slice(1).join('.'), eventProp, t, path ? `${path}.${keys[0]}` : keys[0])
					)
				]
			)
		]
	);
}

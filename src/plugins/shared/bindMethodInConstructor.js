export default function bindMethodInConstructor(constructorPath, methodName, t) {
	constructorPath.get('body').pushContainer('body', t.ExpressionStatement(
		t.AssignmentExpression(
			'=',
			t.MemberExpression(
				t.ThisExpression(),
				t.Identifier(methodName),
			),
			t.CallExpression(
				t.MemberExpression(
					t.MemberExpression(
						t.ThisExpression(),
						t.Identifier(methodName),
					),
					t.Identifier('bind'),
				),
				[t.ThisExpression()],
			),
		),
	));
}


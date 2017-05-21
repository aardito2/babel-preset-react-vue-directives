export default function findOrCreateConstructor(classBodyPath, t) {
	const constructor = {};

	classBodyPath.traverse({
		ClassMethod(path) {
			if (path.node.kind === 'constructor') {
				this.path = path;
			}
		},
	}, constructor);

	if (!constructor.path) {
		classBodyPath.unshiftContainer('body', t.ClassMethod(
			'constructor',
			t.Identifier('constructor'),
			[t.Identifier('props')],
			t.BlockStatement([
				t.ExpressionStatement(
					t.CallExpression(
						t.Super(),
						[t.Identifier('props')],
					),
				),
			]),
		));
		return classBodyPath.get('body')[0];
	}

	return constructor.path;
}


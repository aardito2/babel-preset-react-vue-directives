export default function findOrCreateConstructor(classBodyPath, t) {
	const constructor = {};

	classBodyPath.traverse({
		ClassMethod(path) {
			path.skip();
			if (path.node.kind === 'constructor') {
				this.path = path;
				path.stop();
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


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

export {
	// eslint-disable-next-line import/prefer-default-export
	createDisplayProp,
};

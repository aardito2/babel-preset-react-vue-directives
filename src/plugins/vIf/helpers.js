import parseCondition from '../shared/parseCondition';

function createTernary(t, elseIfs, else_) {
	if (!elseIfs.length && !else_) {
		return t.NullLiteral();
	} else if (!elseIfs.length) {
		else_.openingElement.attributes = else_.openingElement.attributes.filter(attr => attr.name.name !== 'vElse');
		return else_;
	}

	const condition = getElseIfCondition(elseIfs[0], t);

	elseIfs[0].openingElement.attributes = elseIfs[0].openingElement.attributes.filter(attr => attr.name.name !== 'vElseIf');

	return t.ConditionalExpression(
		condition,
		elseIfs[0],
		createTernary(t, elseIfs.slice(1), else_),
	);
}

function getElseIfCondition(node, t) {
	const conditionAttribute = node.openingElement.attributes.find(attr => attr.name.name === 'vElseIf');

	return parseCondition(conditionAttribute, t);
}

export {
	// eslint-disable-next-line import/prefer-default-export
	createTernary,
};


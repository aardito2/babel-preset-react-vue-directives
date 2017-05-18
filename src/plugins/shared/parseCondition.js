export default function parseCondition(conditionAttribute, t) {
	let condition;
	if (t.isStringLiteral(conditionAttribute.value)) {
		condition = t.identifier(conditionAttribute.value.value);
	} else if (t.isJSXExpressionContainer(conditionAttribute.value)) {
		condition = conditionAttribute.value.expression;
	}

	return condition;
}


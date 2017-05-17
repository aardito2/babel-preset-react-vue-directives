import { parse } from 'babylon';

export default function parseCondition(condition, t) {
	const parsed = parse(condition).program.body;

	if (parsed.length !== 1) {
		throw new Error('Invalid v-if/else-if condition');
	}

	if (!t.isExpressionStatement(parsed[0])) {
		throw new Error('Invalid v-if/else-if condition');
	}

	return parsed[0].expression;
}


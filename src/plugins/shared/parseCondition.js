import { parse } from 'babylon';

export default function parseCondition(condition, t) {
	const parsed = parse(condition).program.body;

	if (parsed.length !== 1) {
		throw new Error('Invalid condition');
	}

	if (!t.isExpressionStatement(parsed[0])) {
		throw new Error('Invalid condition');
	}

	return parsed[0].expression;
}


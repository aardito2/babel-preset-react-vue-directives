import { createTernary } from './helpers';
import parseCondition from '../shared/parseCondition';

export default function handleVIf(t, path, vIf) {
	if (path.type !== 'JSXElement') {
		return;
	}

	const { key, container } = path;
	const condition = parseCondition(vIf.value.value, t);
	const elseIfs = [];
	let else_;

	const texts = [];
	let textsBuffer = [];

	for (let i = key + 1; i < container.length; i++) {
		const sibling = container[i];
		if (t.isJSXText(sibling) && sibling.value.trim() !== '') {
			break;
		}

		if (t.isJSXText(sibling)) {
			textsBuffer.push(sibling);
			continue; // eslint-disable-line no-continue
		}

		if (!t.isJSXElement(sibling)) {
			break;
		}

		const siblingElseIf = sibling.openingElement.attributes.find(attr => attr.name.name === 'vElseIf');
		const siblingElse = sibling.openingElement.attributes.find(attr => attr.name.name === 'vElse');

		if (!siblingElseIf && !siblingElse) {
			break;
		}

		if (textsBuffer.length) {
			Array.prototype.push.apply(texts, textsBuffer);
			textsBuffer = [];
		}

		if (siblingElseIf) {
			elseIfs.push(sibling);
		} else {
			else_ = sibling;
			break;
		}
	}

	if (!path.node.openingElement) {
		return;
	}
	path.node.openingElement.attributes = path.node.openingElement.attributes
		.filter(attr => attr !== vIf);

	let newNode = t.JSXExpressionContainer(
		t.ConditionalExpression(
			condition,
			path.node,
			createTernary(t, elseIfs, else_),
		),
	);

	if (!t.isJSXElement(path.parent)) {
		newNode = t.JSXElement(
			t.JSXOpeningElement(
				t.JSXIdentifier('div'),
				[],
			),
			t.JSXClosingElement(
				t.JSXIdentifier('div'),
			),
			[newNode],
		);
	}

	path.replaceWith(newNode);

	if (Array.isArray(container)) {
		path.container = container.filter((node) => {
			if (~elseIfs.indexOf(node)) return false;
			if (else_ === node) return false;

			return !texts.includes(node);
		});

		path.parentPath.node.children = path.container;
	}
}


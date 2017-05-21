import generate from 'babel-generator';
import {
	isKeyboardEvent,
	validateEventType,
	validateModifier,
	attributeVisitor,
} from './helpers';
import { unique } from '../shared/util';
import errorVisitor from '../shared/errorVisitor';

export default function handleVOn(t, path, vOn, isJSXExpressionContainer = false) {
	const attrName = vOn.name.name;
	const firstSeparatorPos = attrName.indexOf('$');
	const props = attrName.slice(firstSeparatorPos + 1).split('$');

	let value;

	if (isJSXExpressionContainer) {
		if (t.isIdentifier(vOn.value.expression)) {
			value = vOn.value.expression.name;
		} else {
			value = generate(vOn.value.expression).code;
		}
	} else {
		value = vOn.value.value;
	}

	let eventType = props[0];
	let [...modifiers] = props.slice(1);

	modifiers = unique(modifiers);

	const keyboardEventType = isKeyboardEvent(eventType);
	if (keyboardEventType && eventType.length > keyboardEventType.length) {
		modifiers.push(eventType.slice(keyboardEventType.length));
		eventType = keyboardEventType;
	} else if (keyboardEventType) {
		errorVisitor(vOn, path, 'JSXAttribute', 'Key event with no key code specified');
	}

	if (!validateEventType(eventType)) {
		errorVisitor(vOn, path, 'JSXAttribute', 'Invalid event type');
	}

	for (let i = 0; i < modifiers.length; i++) {
		const isValid = validateModifier(eventType, modifiers[i]);

		if (!isValid) {
			errorVisitor(vOn, path, 'JSXAttribute', `Invalid event modifier: ${modifiers[i]}`);
		}
	}

	path.traverse(attributeVisitor, { t, vOn, eventType, modifiers, value });
}


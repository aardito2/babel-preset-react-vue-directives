import {
	isKeyboardEvent,
	validateEventType,
	validateModifier,
	attributeVisitor,
} from './helpers';
import { unique } from '../shared/util';

export default function handleVOn(t, path, vOn) {
	let eventType;
	let modifiers = [];

	const attrName = vOn.name.name;
	const firstSeparatorPos = attrName.indexOf('$');
	if (firstSeparatorPos === -1 || firstSeparatorPos === attrName.length - 1) {
		throw new Error('Invalid vOn attribute name');
	}

	let match;

	const regex = /(\w+)(?:\$)?/g;
	const attrNameSliced = attrName.slice(firstSeparatorPos + 1);

	// eslint-disable-next-line no-cond-assign
	while (match = regex.exec(attrNameSliced)) {
		const [, param] = match;
		if (!eventType) {
			eventType = param;
		} else {
			modifiers.push(param);
		}
	}

	modifiers = unique(modifiers);

	const keyboardEventType = isKeyboardEvent(eventType);
	if (keyboardEventType && eventType.length > keyboardEventType.length) {
		modifiers.push(eventType.slice(keyboardEventType.length));
		eventType = keyboardEventType;
	}

	if (!validateEventType(eventType)) {
		console.warn('Invalid event type for vOn, skipping');
		return;
	}

	for (let i = 0; i < modifiers.length; i++) {
		const isValid = validateModifier(eventType, modifiers[i]);

		if (!isValid) {
			console.warn(`Invalid event modifier in vOn: ${modifiers[i]}, skipping`);
			modifiers.splice(i, 1);
			i -= 1;
		}
	}

	path.traverse(attributeVisitor, { t, vOn, eventType, modifiers });
}


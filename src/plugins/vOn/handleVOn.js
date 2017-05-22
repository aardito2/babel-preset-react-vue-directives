import {
	isKeyboardEvent,
	validateEventType,
	validateModifier,
	replaceVOnAttribute,
	convertVOnAttrToValue,
} from './helpers';
import { unique } from '../shared/util';
import { throwAttributeError } from '../shared';

export default function handleVOn(t, path, classBodyPath, vOn) {
	const attrName = vOn.name.name;
	const firstSeparatorPos = attrName.indexOf('$');
	const props = attrName.slice(firstSeparatorPos + 1).split('$');

	const value = convertVOnAttrToValue(vOn, path, t);

	let eventType = props[0];
	let [...modifiers] = props.slice(1);

	modifiers = unique(modifiers);

	const keyboardEventType = isKeyboardEvent(eventType);
	if (keyboardEventType && eventType.length > keyboardEventType.length) {
		modifiers.push(eventType.slice(keyboardEventType.length));
		eventType = keyboardEventType;
	} else if (keyboardEventType) {
		throwAttributeError(path, vOn, 'Key event with no key code specified');
	}

	if (!validateEventType(eventType)) {
		throwAttributeError(path, vOn, 'Invalid event type for vOn');
	}

	for (let i = 0; i < modifiers.length; i++) {
		const isValid = validateModifier(eventType, modifiers[i]);

		if (!isValid) {
			throwAttributeError(path, vOn, `Invalid event modifier for vOn: ${modifiers[i]}`);
		}
	}

	replaceVOnAttribute(
		t,
		path.get('openingElement').get('attributes').find(p => p.node === vOn),
		classBodyPath,
		eventType,
		modifiers,
		value,
	);
}


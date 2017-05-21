import { parse } from 'babylon';
import validEventTypes, { mouseEventTypes } from './eventTypes';
import validKeyCodes from './keyCodes';

const validModifiers = [
	'stop',
	'prevent',
	'capture',
	// TODO:
	// 'self',
	// 'once'
];

const keyAliases = {
	Enter: 13,
	Tab: 9,
	Delete: 8,
	Esc: 27,
	Space: 32,
	Up: 38,
	Down: 40,
	Left: 37,
	Right: 39,
};

const modifierKeys = [
	'ctrl',
	'alt',
	'shift',
	'meta',
];

const mouseButtonModifiers = [
	'left',
	'right',
	'middle',
];

function replaceVOnAttribute(t, path, eventType, modifiers, value) {
	const eventHandler = value;

	let codeEventType = eventType[0].toUpperCase() + eventType.slice(1);

	if (path.parentPath.node.attributes.find(attr => attr.name.name === `on${codeEventType}`)) {
		throw path.buildCodeFrameError(`Node already has ${codeEventType} handler`);
	}

	codeEventType = `on${codeEventType}`;

	const conditions = [];

	if (modifiers.includes('capture')) {
		codeEventType += 'Capture';
	}

	let sourceString = 'event => {';

	if (modifiers.includes('prevent')) {
		sourceString += 'event.preventDefault();';
	}

	if (modifiers.includes('stop')) {
		sourceString += 'event.stopPropagation();';
	}

	if (isMouseEvent(eventType)) {
		const buttonModifiers = modifiers.filter(mod => mouseButtonModifiers.includes(mod));
		if (buttonModifiers.length) {
			let button;

			buttonModifiers.forEach(bm => {
				switch (bm) {
					case 'left':
						button = 1;
						break;
					case 'middle':
						button = 4;
						break;
					case 'right':
						button = 2;
						break;
					default:
						throw new Error('Invalid button modifier');
				}

				conditions.push(`(event.buttons & ${button})`);
			});
		}
	}

	if (isKeyboardEvent(eventType)) {
		const keyAliasMods = modifiers.filter(mod => keyAliases[mod]);
		if (keyAliasMods.length) {
			keyAliasMods.forEach(kam => {
				conditions.push(`(event.keyCode === ${keyAliases[kam]})`);
			});
		}

		const keycodeMods = modifiers.filter(mod => String(parseInt(mod, 10)) === mod);
		if (keycodeMods.length) {
			keycodeMods.forEach(kcm => {
				conditions.push(`(event.keyCode === ${parseInt(kcm, 10)})`);
			});
		}
	}

	const modifierKeyMods = modifiers.filter(mod => modifierKeys.includes(mod));
	if (modifierKeyMods.length) {
		modifierKeyMods.forEach(mkm => {
			conditions.push(`(event.${mkm}Key)`);
		});
	}

	if (conditions.length) {
		sourceString += `if (${conditions.join(' && ')}) {`;
		sourceString += `(${eventHandler})(event);`;
		sourceString += '} ';
	} else {
		sourceString += `(${eventHandler})(event);`;
	}

	sourceString += '}';

	const newNode = t.JSXAttribute(
		t.JSXIdentifier(codeEventType),
		t.JSXExpressionContainer(
			parse(sourceString).program.body[0].expression,
		),
	);

	path.replaceWith(newNode);
}

function isKeyboardEvent(type) {
	if (type.startsWith('keyDown')) {
		return 'keyDown';
	} else if (type.startsWith('keyPress')) {
		return 'keyPress';
	} else if (type.startsWith('keyUp')) {
		return 'keyUp';
	}

	return false;
}

function validateEventType(type) {
	if (validEventTypes.includes(type)) {
		return true;
	}

	return false;
}

function isMouseEvent(type) {
	if (mouseEventTypes.includes(type)) {
		return true;
	}

	return false;
}

function validateModifier(eventType, modifier) {
	if (modifier === 'capture' &&
		(eventType === 'mouseEnter' ||
			eventType === 'mouseLeave')) {
		return false;
	}

	const parsedInt = parseInt(modifier, 10);

	if (String(parsedInt) === modifier) {
		if (!isKeyboardEvent(eventType)) {
			return false;
		} else if (!validKeyCodes.includes(parsedInt)) {
			return false;
		}
		return true;
	}

	if (validModifiers.includes(modifier)) {
		return true;
	}

	const isMouse = isMouseEvent(eventType);
	const isKeyboard = isKeyboardEvent(eventType);

	if (isMouse) {
		if (modifierKeys.includes(modifier) ||
			mouseButtonModifiers.includes(modifier)) {
			return true;
		}
	}

	if (isKeyboard) {
		if (keyAliases[modifier]) {
			return true;
		}
	}

	if (modifierKeys.includes(modifier)) {
		return isKeyboard || isMouse;
	}

	return false;
}

const attributeVisitor = {
	JSXAttribute(path) {
		if (path.node === this.vOn) {
			replaceVOnAttribute(this.t, path, this.eventType, this.modifiers, this.value);
		}
	},
};

export {
	isKeyboardEvent,
	validateEventType,
	validateModifier,
	attributeVisitor,
};


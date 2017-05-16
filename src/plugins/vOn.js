import { parse } from 'babylon';
import syntaxJsx from 'babel-plugin-syntax-jsx';
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

export default function ({ types: t }) {
	return {
		inherits: syntaxJsx,
		visitor: {
			JSXElement(path) {
				if (path.node.openingElement.attributes.length) {
					const vOn = path.node.openingElement.attributes.find(attr => attr.name.name.startsWith('vOn'));

					if (vOn && t.isStringLiteral(vOn.value)) {
						handleVOn(t, path, vOn);
					}
				}
			},
		},
	};
}

function unique(arr) {
	return arr.filter((v, i, self) => self.indexOf(v) === i);
}

function validateEventType(type) {
	if (validEventTypes.includes(type)) {
		return true;
	}

	if (isKeyboardEvent(type)) {
		return true;
	}

	return false;
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
		if (validKeyCodes.includes(modifier)) {
			return true;
		} else if (keyAliases[modifier]) {
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
			replaceVOnAttribute(this.t, path, this.eventType, this.modifiers);
		}
	},
};

function handleVOn(t, path, vOn) {
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

function replaceVOnAttribute(t, path, eventType, modifiers) {
	const eventHandler = path.node.value.value;

	let codeEventType = eventType[0].toUpperCase() + eventType.slice(1);

	if (path.parentPath.node.attributes.find(attr => attr.name.name === codeEventType || attr.name.name === `on${codeEventType}`)) {
		console.warn(`Node already has ${codeEventType} handler, skipping vOn`);
		return;
	}

	codeEventType = `on${codeEventType}`;

	const conditions = [];

	if (modifiers.includes('capture')) {
		codeEventType += 'Capture';
	}

	// let sourceString = `on${codeEventType}={(event) => { `;
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

			buttonModifiers.forEach((bm) => {
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
			keyAliasMods.forEach((kam) => {
				conditions.push(`(event.keyCode === ${keyAliases[kam]})`);
			});
		}

		const keycodeMods = modifiers.filter(mod => String(parseInt(mod, 10)) === mod);
		if (keycodeMods.length) {
			keycodeMods.forEach((kcm) => {
				conditions.push(`(event.keyCode === ${parseInt(kcm, 10)})`);
			});
		}
	}

	const modifierKeyMods = modifiers.filter(mod => modifierKeys.includes(mod));
	if (modifierKeyMods.length) {
		modifierKeyMods.forEach((mkm) => {
			conditions.push(`(event.${mkm}Key)`);
		});
	}

	if (conditions.length) {
		sourceString += `if (${conditions.join(' && ')}) {`;
		sourceString += `${eventHandler}(event);`;
		sourceString += '} ';
	} else {
		sourceString += `${eventHandler}(event);`;
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

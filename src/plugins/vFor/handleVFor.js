import cloneDeep from 'lodash.clonedeep';
import { removeAttributeVisitor, throwAttributeError } from '../shared';

const arrOrObjTemplate = template => template(`Array.isArray(COLLECTION) ? 
COLLECTION.map((ELEMENT_OR_VALUE, INDEX) => NODE_ARR) :
Object.keys(COLLECTION).map(KEY => ({ 
KEY, 
ELEMENT_OR_VALUE: COLLECTION[KEY]
})).map(({ KEY, ELEMENT_OR_VALUE }) => NODE_OBJ)`);

const objTemplate = template => template(`Object.keys(COLLECTION).map((KEY, INDEX) => ({
KEY,
ELEMENT_OR_VALUE: COLLECTION[KEY],
INDEX
})).map(({ KEY, ELEMENT_OR_VALUE, INDEX }) => NODE_OBJ)`);

export default function handleVFor(t, path, vFor, template) {
	const forVal = vFor.value.value;

	let collection;
	let indexOrKey;
	let index;

	const re = /^(?:(\w+)|\((\w+), ?(\w+)\)|\((\w+), ?(\w+), ?(\w+)\)) (?:of|in) (\w+)$/;

	let match = forVal.match(re);

	if (!match) {
		throwAttributeError(path, vFor, 'Invalid vFor format');
	}

	match = match.slice(1).filter(m => m);

	const elementOrValue = match[0];

	if (match.length === 2) {
		[, collection] = match;
	} else if (match.length === 3) {
		[, indexOrKey, collection] = match;
	} else {
		[, indexOrKey, index, collection] = match;
	}

	removeAttributeVisitor(path, vFor);

	let newNode;


	let INDEX;
	if (index) {
		INDEX = t.identifier(index);
	} else {
		INDEX = indexOrKey ? t.identifier(indexOrKey) : t.identifier('_idx');
	}

	let result;

	const _key = path.scope.generateUidIdentifier('key');
	const _idx = path.scope.generateUidIdentifier('idx');

	if (!index) {
		const nodeKey = indexOrKey ? t.ConditionalExpression(
			t.BinaryExpression(
				'!==',
				t.identifier(indexOrKey),
				t.identifier('undefined'),
			),
			t.identifier(indexOrKey),
			_idx,
		) : t.ConditionalExpression(
			t.BinaryExpression(
				'!==',
				_idx,
				t.identifier('undefined'),
			),
			_idx,
			_key,
		);

		if (!path.node.openingElement.attributes.find(attr => attr.name.name === 'key')) {
			path.get('openingElement').pushContainer('attributes', t.JSXAttribute(
				t.JSXIdentifier('key'),
				t.JSXExpressionContainer(nodeKey),
			));
		}

		result = arrOrObjTemplate(template)({
			ELEMENT_OR_VALUE: t.identifier(elementOrValue),
			COLLECTION: t.identifier(collection),
			INDEX,
			KEY: indexOrKey ? t.identifier(indexOrKey) : _key,
			NODE_ARR: path.node,
			NODE_OBJ: cloneDeep(path.node),
		});
	} else {
		path.get('openingElement').pushContainer('attributes', t.JSXAttribute(
			t.JSXIdentifier('key'),
			t.JSXExpressionContainer(
				t.identifier(indexOrKey),
			),
		));

		result = objTemplate(template)({
			ELEMENT_OR_VALUE: t.identifier(elementOrValue),
			COLLECTION: t.identifier(collection),
			INDEX,
			KEY: t.identifier(indexOrKey),
			NODE_OBJ: path.node,
		});
	}

	newNode = t.JSXExpressionContainer(result.expression);

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
}

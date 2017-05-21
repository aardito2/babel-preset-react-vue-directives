export default function throwAttributeError(path, attributeNode, msg) {
	const errorPath = path.get('openingElement').get('attributes').find(p => p.node === attributeNode);
	throw errorPath.buildCodeFrameError(msg);
}


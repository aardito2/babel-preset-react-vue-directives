/* eslint-disable no-shadow */

export default function removeAttributeVisitor(path, attr) {
	return path.traverse({
		JSXAttribute(path) {
			if (path.node === this.attr) {
				path.remove();
			}
		},
	}, { attr });
}


/* eslint-disable no-shadow */

export default function removeAttributeVisitor(path, attr) {
	return path.traverse({
		JSXAttribute(path) {
			path.skip();
			if (path.node === this.attr) {
				path.remove();
				path.stop();
			}
		},
	}, { attr });
}


/* eslint-disable no-shadow */

export default function (node, path, type, msg) {
	return path.traverse({
		[type](path) {
			if (path.node === this.node) {
				throw path.buildCodeFrameError(msg);
			}
		},
	}, { node });
}


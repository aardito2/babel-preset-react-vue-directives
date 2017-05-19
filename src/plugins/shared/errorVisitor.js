export default function (node, path, type, msg) {
	return path.traverse({
		[type](path) {
			throw path.buildCodeFrameError(msg);
		}
	}, { node });
}


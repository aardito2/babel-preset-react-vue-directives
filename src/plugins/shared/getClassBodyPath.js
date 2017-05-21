export default function getClassBodyPath(path) {
	let classBodyPath = path;
	while (classBodyPath.type !== 'ClassBody' && classBodyPath.parentPath) {
		classBodyPath = classBodyPath.parentPath;
	}

	return classBodyPath.type === 'ClassBody' ? classBodyPath : null;
}


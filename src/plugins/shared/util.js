function unique(arr) {
	return arr.filter((v, i, self) => self.indexOf(v) === i);
}

function capitalize(str) {
	if (!str) return '';
	return str[0].toUpperCase() + str.slice(1);
}

export {
	unique,
	capitalize,
};


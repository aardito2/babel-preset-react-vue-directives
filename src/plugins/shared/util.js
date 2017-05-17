function unique(arr) {
	return arr.filter((v, i, self) => self.indexOf(v) === i);
}

export {
	// eslint-disable-next-line import/prefer-default-export
	unique,
};


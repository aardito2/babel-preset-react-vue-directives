import { unique, capitalize } from '../src/plugins/shared/util';

describe('unique', () => {
	it('returns unique elements of an array', () => {
		expect(unique([1, 3, 3, 4])).toEqual([1, 3, 4]);
	});
});

describe('capitalize', () => {
	it('capitalizes the first letter of a word', () => {
		expect(capitalize('word')).toEqual('Word');
	});

	it('returns an empty string when passed an empty string', () => {
		expect(capitalize('')).toEqual('');
	});
})

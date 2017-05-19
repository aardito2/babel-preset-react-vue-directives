import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('Vue directives in React', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((feature) => {
		fs.readdirSync(path.join(fixturesDir, feature)).map(caseName => {
			it(`should ${feature} ${caseName.split('-').join(' ')}`, () => {
				const fixtureDir = path.join(fixturesDir, feature, caseName);
				const actualPath = path.join(fixtureDir, 'actual.js');

				if (caseName.startsWith('throws')) {
					expect(() => transformFileSync(actualPath)).toThrow();
				} else {
					const actual = transformFileSync(actualPath).code;

					const expected = fs.readFileSync(
						path.join(fixtureDir, 'expected.js')
					).toString();

					expect(trim(actual)).toEqual(trim(expected));
				}
			});
		});
  });
});

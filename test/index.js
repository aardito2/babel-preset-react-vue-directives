import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '../src';

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
				const actual = transformFileSync(actualPath).code;

				const expected = fs.readFileSync(
					path.join(fixtureDir, 'expected.js')
				).toString();

				assert.equal(trim(actual), trim(expected));
			});
		});
  });
});

/*
 * Grammar Error Tests
 *
 * These tests check that our grammar will reject programs with various
 * syntax errors.
 */

const syntaxCheck = require('../syntax-checker');

const errors = [
  ['rogue else', 'else x > 1: break'],
  ['used keyword as variable name', 'fnc = 10'],
  ['rogue semicolon', 'print("hi");'],
  [
    'Indent',
    `print(1)
if x:
    print(1)
  print(3)`,
  ],
];

describe('The syntax checker', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
});

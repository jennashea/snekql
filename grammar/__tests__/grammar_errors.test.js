/*
 * Grammar Error Tests
 *
 * These tests check that our grammar will reject programs with various
 * syntax errors.
 */

const syntaxCheck = require('../syntax-checker');

const operationErrors = [
  ['unsupported semicolon', 'print("hi");'],
  ['unsupported tilde', '3~'],
  ['improper integer division', '3///4'],
  ['improper integer division', '3///4'],
  ['improper call', 'hiss(10'],
  ['improper comparator 1', '10 =< 2'],
  ['improper comparator 2', '10 => 2'],
  ['improper comparator 3', '10 !> 2'],
  ['improper comparator 4', '10 >! 2'],
  ['improper comparator 5', '10 =! 2'],
  ['improper comparator 6', '10 >> 2'],
  ['improper comparator 7', '10 << 2']
];

const variableErrors =   [
  ['illegal variable name', 'fnc = 10'],
  ['improper reassign','a =* 10'],
  ['improper array 1','x = [2, 3, 4,]'],
  ['improper array 2','x = [, 2, 3, 4]'],
  ['improper array 3','x = 2, 3, 4]'],
  ['improper array 4','x = [2, 3, 4'],
  ['improper array 5','x = 2, 3, 4'],
  ['improper array call', 'a[if a > b: hiss("yay")]'],
  ['improper array call 2', 'a[for something in data: hiss(something)]']
];

const loopErrors = [
  [
    'improper indent 1',
    `hiss(1)
if x:
    hiss(1)
  hiss(3)`
  ],
  ['rogue else', 'else x > 1: break'],
  ['else without if', 'else: hiss(2)'],
  ['elif without if', 'elif x > 3: hiss(2)'],
  [
    'else before elif',
    `if x < 2:
      hiss("no")
    else:
      hiss(2)
    elif x > 3:
      hiss(3)`
  ],
  [
    'no colon',
    `if c > 10
      return 0`
  ],
  ['lack of continuation from statement','if 10:']
];

describe('The syntax checker', () => {
  operationErrors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
  loopErrors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
  // errors.forEach(([scenario, program]) => {
  //   test(`detects the error ${scenario}`, done => {
  //     expect(syntaxCheck(program)).toBe(false);
  //     done();
  //   });
  // });
});

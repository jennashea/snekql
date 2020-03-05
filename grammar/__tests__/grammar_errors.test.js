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
    `hiss(1)
if x:
    hiss(1)
  hiss(3)`,
  ],
  ['improper array', 'myArray[if a > b: hiss("yay")]'],
  ['improper array 2', 'myArray[for something in data: hiss(something)]'],
  [
    'no semi-colon',
    `if c > 10
      return 0`
  ],
  ['incorrect binary expression', '3///4'],
  ['lack of continuation from statement','if 10:'],
  ['bad call', 'hiss(10'],
  ['bad comparator', '10 =< 2'],
  ['bad reassign','a =* 10'],
  ['bad array 1','x = [2, 3, 4,]'],
  ['bad array 2','x = [, 2, 3, 4]'],
  ['bad array 3','x = 2, 3, 4]'],
  ['bad array 4','x = [2, 3, 4'],
  ['bad array 5','x = 2, 3, 4'],
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
  ]
];

describe('The syntax checker', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
});

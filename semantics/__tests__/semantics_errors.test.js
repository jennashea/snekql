/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['use of undeclared variable', 'x + 1'],
  ['redeclaration of declared variable', 'let x = 10 let x'],
  [
    'non boolean while condition',
    `
  while "hello":
  ⇨i = 10
  ⇦
  `,
  ],
  [
    'non integer boolean condition',
    `
  if "hello":
  ⇨hiss("word")
  ⇦`,
  ],
  ['non integer in add', '3 + "dog"'],
  ['non integer in subtract', '"dog" - 5'],
  ['types do not match in inequality test', '2 > "dog"'],
  [
    'too many function arguments',
    `fnc doubleIt(x:int):
    ⇨return x*2
    ⇦
    doubleIt(1, 2)
   `,
  ],
  [
    'too few function arguments',
    `fnc multiply(x:int , y:int):
    ⇨return x*y
    ⇦
    multiply(1)
  `,
  ],
  [
    'wrong type of function argument',
    `
   fnc split(word:str):
    ⇨return word[0:2]
    ⇦
    multiply(100)
   `,
  ],
  ['subscript of nonarray', 'a = 10 a[10] = 1'],
  ['call of nonfunction', 'a = 10 a(1000)'],
  [
    'not iterable type',
    `for i in 100:
  ⇨hiss("hello world")
  ⇦
  `,
  ],
  ['array not all same type', `[1, 2, 3, "brandon"]`],
  ['return must be inside a function', `return 10`],
  ['break must be inside a function', `break`],
  ['Rule not proper expression type', `@ >= [1, 2, 3]`],
];

describe('The semantic analyzer', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      const astRoot = parse(program);
      expect(astRoot).toBeTruthy();
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow();
      done();
    });
  });
});

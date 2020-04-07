/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require("../../ast/parser");
const Context = require("../context");

const errors = [
  ["use of undeclared variable", "x + 1"],
  [
    "non integer while condition",
    `
  while "hello":
  ⇨i = 10
  ⇦
  `,
  ],
  [
    "non integer if condition",
    `
  if "hello": 
  ⇨hiss("word")
  ⇦`,
  ],
  ["non integer in add", '3 + "dog"'],
  ["non integer in subtract", '"dog" - 5'],
  ["types do not match in inequality test", '2 > "dog"'],
  ["too many function arguments", "pythagorean(1, 2, 3)"],
  ["too few function arguments", 'repeat("x")'],
  ["wrong type of function argument", "ord(8)"],
  ["member of nonrecord", "person.chair"],
  ["subscript of nonarray", "a = 10 a[10] = 1"],
  ["call of nonfunction", "a = 10 a(1000)"],
];

describe("The semantic analyzer", () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, (done) => {
      const astRoot = parse(program);
      expect(astRoot).toBeTruthy();
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow();
      done();
    });
  });
});

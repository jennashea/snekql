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
  // ["types do not match in equality test", '"dog" = "dog"'],
  ["types do not match in inequality test", '2 > "dog"'],
  // ["types do not match in declaration", ''],
  // [
  // "undeclared because in other scope",
  // "let var x := 1 in let var y := 2 in 1 end; y end",
  // ],
  // ['redeclaration of variable', 'let var x := 1 var x := 2 in nil end'],
  // ['type mismatch in assignment', 'let var x := 1 var y := "abc" in x := y end'],
  // ['writing to (readonly) for loop index', 'for i := 0 to 10 do i := 3'],
  ["too many function arguments", "pythagorean(1, 2, 3)"],
  ["too few function arguments", 'repeat("x")'],
  ["wrong type of function argument", "ord(8)"],
  // ['redeclared field', 'let type p = {r: int, r: int} in 0 end'],
  // ["no such field", "let type p = {r: int} var s: p := nil in s.zzz end"],
  ["member of nonrecord", "person.chair"],
  ["subscript of nonarray", "a = 10 a[10] = 1"],
  ["call of nonfunction", "a = 10 a(1000)"],
  // [
  //   "non integer subscript",
  //   'let type list = array of int var a := list [1] of 0 in a["x"] end',
  // ],
  // Might need more here, depending on your test coverage report
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

/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

const parse = require("../../ast/parser");
const analyze = require("../../semantics/analyzer");
const generate = require("../javascript-generator");

const fixture = {
  hello: [
    String.raw`hiss("Hello World")`,
    String.raw`console.log("Hello World")`,
  ],
  stringLiterals: [String.raw`"Hello World"`, String.raw`"Hello World"`],
  numLiterals: [String.raw`500.15`, String.raw`500.15`],
  binaryexp: [String.raw`100 ** 100`, String.raw`100 ** 100`],
  declarations: [String.raw`let a = 100`, String.raw`let a_1 = 100`],
  assignments: [
    String.raw`
      let test = 234
      test = 1999
    `,
    String.raw`let test_2 = 234;
test_2 = 1999`,
  ],
};

describe("The JavaScript generator", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      analyze(ast);
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});

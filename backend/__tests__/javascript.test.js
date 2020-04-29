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
  hello: [`hiss("Hello World")`, `console.log("Hello World")`],
  stringLiterals: [`"Hello World"`, `"Hello World"`],
  numLiterals: [`500.15`, `500.15`],
  binaryexp: [`100 ** 100`, `100 ** 100`],
  binaryexpWithNeg: [`-100 ** 100`, `((-(100)) ** 100)`],
  declarations: [`let a = 100`, `let a_1 = 100`],
  assignments: [
    `
      let test = 234
      test = 1999
    `,
    `let test_2 = 234;
test_2 = 1999`,
  ],
  // nullExamples: [`let empty = null`, `null`],
  whileLoop: [
    `
  let i = 10
  while i < 10:
  ⇨i = i + 1
  hiss(i)
  ⇦
`,
    `let i_3 = 10;
while ((i_3 < 10)) {
  i_3 = (i_3 + 1);
  console.log(i_3)
}`,
  ],
  forLoop: [
    `
  for letter in "brandon":
  ⇨hiss(letter)
  ⇦
  `,
    `for (const letter_4 of \"brandon\") {
  console.log(letter_4)
}`,
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

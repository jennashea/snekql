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
    `let test = 234
test = 1999
    `,
    `let test_2 = 234;
test_2 = 1999`,
  ],
  whileLoop: [
    `let i = 10
while i < 10:
  i = i + 1
  hiss(i)
  break
`,
    `let i_3 = 10;
while ((i_3 < 10)) {
  i_3 = (i_3 + 1);
  console.log(i_3);
  break;
}`,
  ],
  forLoop: [
    `for letter in "brandon":
  hiss(letter)
  `,
    `for (const letter_4 of "brandon") {
  console.log(letter_4)
}`,
  ],
  functions: [
    `fnc double(x: int):
  return x*2
`,
    `function double_5(x_6) {
  return (x_6 * 2)
}`,
  ],
  calls: [`double(100)`, `double_5(100)`],
  ifStatements: [
    `if i < 10:
  hiss(i)
elif i > 10:
  hiss(i)
else:
  hiss(i)
`,
    `if ((i_3 < 10)) {
  console.log(i_3)
} else if ((i_3 > 10)) {
  console.log(i_3)
} else {
  console.log(i_3)
}`,
  ],
  arrays: [`[1, 2, 3, 4]`, `[1, 2, 3, 4]`],
  rules: [
    `let constraint = @ != i`,
    `let constraint_7 = (value) => value !== i_3`,
  ],
  subscripted: [
    `let array = [1, 2, 3]
array[0:3]`,
    `let array_8 = [1, 2, 3];
array_8.slice(0, 3)`,
  ],
  nullTest: [`let empty = null`, `let empty_9 = null`],
  usingRange: [
    `let animals = ["dogs", "cats", "birds"]
hiss(animals[0])
hiss(animals[1:3])`,
    `let animals_10 = ["dogs", "cats", "birds"];
console.log(animals_10[0]);
console.log(animals_10.slice(1, 3))`,
  ],
  noInitialization: [`let nothing`, `let nothing_11`],
  functionsReturnString: [
    `fnc hi():
  return "hello!"
`,
    `function hi_12() {
  return "hello!"
}`,
  ],
  simpleIf: [
    `if 1 > 0:
  hiss("WTF?")
  `,
    `if`,
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

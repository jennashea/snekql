//JavaScript Code Generator Tests

const parse = require('../../ast/parser');
const analyze = require('../../semantics/analyzer');
const generate = require('../javascript-generator');

const fixture = {
  hello: [String.raw`print("Hello, world\n")`, String.raw`console.log("Hello, world\n")`],

  call: [

  ],

  whileLoop: [

  ],

  forLoop:[

  ],


};

describe('The JavaScript generator', () => {
    Object.entries(fixture).forEach(([name, [source, expected]]) => {
      test(`produces the correct output for ${name}`, done => {
        const ast = parse(source);
        analyze(ast);
        expect(generate(ast)).toMatch(expected);
        done();
      });
    });
  });
const parse = require('../parser');

const {
  BinaryExp,
  Literal,
  IdExp,
  Print,
  Assignment,
  NegationExp,
  WhileExp,
  Suite,
  ForExp,
  Call,
  Argument,
  Null,
  Member,
  SubscriptedRangeable,
  IfStmt,
  Break,
  Rule,
  Arr,
  FunctionDeclaration,
  ArrayType,
  Types,
  Param,
  Params,
  Return,
} = require('../../ast');

const fixture = {
  binaryOperators: [String.raw`1 or 0`, [new BinaryExp('or', new Literal(1), new Literal(0))]],
  binaryOperators2: [String.raw`1 and 0`, [new BinaryExp('and', new Literal(1), new Literal(0))]],
  binaryOperators3: [String.raw`1 + 0`, [new BinaryExp('+', new Literal(1), new Literal(0))]],
  binaryOperators4: [String.raw`1 * 2`, [new BinaryExp('*', new Literal(1), new Literal(2))]],
  binaryOperators5: [
    String.raw`10 <= 100`,
    [new BinaryExp('<=', new Literal(10), new Literal(100))],
  ],
  binaryOperators6: [String.raw`2 ** 3`, [new BinaryExp('**', new Literal(2), new Literal(3))]],
  negation: [
    String.raw`-200 + 100`,
    [new BinaryExp('+', new NegationExp(new Literal(200)), new Literal(100))],
  ],

  hello: [String.raw`hiss("Hello, world")`, [new Print(new Literal('Hello, world'))]],
  assignment: [String.raw`c = 1000`, [[new Assignment('=', new IdExp('c'), new Literal(1000))]]],
  whileLoop: [
    String.raw`
    while 1 < 5:
    ⇨hiss("Hello World")
    ⇦
    `,
    [
      new WhileExp(
        new BinaryExp('<', new Literal(1), new Literal(5)),
        new Suite([new Print(new Literal('Hello World'))])
      ),
    ],
  ],
  forLoop: [
    String.raw`
    for i in snek:
    ⇨hiss("Hello World")
    ⇦
    `,
    [
      new ForExp(
        new IdExp('i'),
        new IdExp('snek'),
        new Suite([new Print(new Literal('Hello World'))])
      ),
    ],
  ],
  calls: [
    String.raw`
    foo(5, 10)
    `,

    [
      new Call(new IdExp('foo'), [
        new Argument(null, new Literal(5)),
        new Argument(null, new Literal(10)),
      ]),
    ],
  ],
  subscripted: [
    String.raw`
    foo[0]
    foo.b
    `,
    [
      new SubscriptedRangeable(new IdExp('foo'), new Literal(0), null),
      new Member(new IdExp('foo'), new IdExp('b')),
    ],
  ],
  assignmentOfLvals: [
    String.raw`
    foo[0] = 100
    `,
    [
      new Assignment(
        '=',
        new SubscriptedRangeable(new IdExp('foo'), new Literal(0), null),
        new Literal(100)
      ),
    ],
  ],
  ifStatements: [
    String.raw`
    if i < 1:
    ⇨hiss("i is less than 1")
    ⇦elif i > 1:
    ⇨hiss("i is greater than 1")
    ⇦else:
    ⇨hiss("i is equivalent to 1")
    ⇦
    `,
    [
      new IfStmt(
        new BinaryExp('<', new IdExp('i'), new Literal(1)),
        new Suite([new Print(new Literal('i is less than 1'))]),
        [new BinaryExp('>', new IdExp('i'), new Literal(1))],
        [new Suite([new Print(new Literal('i is greater than 1'))])],
        new Suite([new Print(new Literal('i is equivalent to 1'))])
      ),
    ],
  ],

  breaks: [
    String.raw`
  break
  `,
    [new Break()],
  ],
  rules: [
    String.raw`
      @ > 100
    `,
    [new Rule('>', [new Literal(100)])],
  ],
  arrays: [
    String.raw`
      [1, 2, 3, 4]
    `,
    [new Arr([new Literal(1), new Literal(2), new Literal(3), new Literal(4)])],
  ],
  functionDeclaration: [
    String.raw`
      fnc foo(a:arr[int], b:boo, c:str):
      ⇨hiss("a, b, and c were passed in")
      ⇦
    `,
    [
      [
        new FunctionDeclaration(
          new IdExp('foo'),
          new Params([
            new Param(new IdExp('a'), new Types(new ArrayType('arr', new Types('int')))),
            new Param(new IdExp('b'), new Types('boo')),
            new Param(new IdExp('c'), new Types('str')),
          ]),
          new Suite([new Print(new Literal('a, b, and c were passed in'))])
        ),
      ],
    ],
  ],
};

describe('The parser', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual({ statements: expected });
      done();
    });
  });

  test('throws an exception on a syntax error', done => {
    expect(() => parse('as$df^&%*$&')).toThrow();
    done();
  });
});

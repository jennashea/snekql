/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require("../parser");

const {
  // ArrayExp, ArrayType, Assignment, BinaryExp, Binding, Break, Call, ExpSeq, Field,
  // ForExp, Func, IdExp, IfExp, LetExp, Literal, MemberExp, NegationExp, Nil, Param,
  // RecordExp, RecordType, SubscriptedExp, TypeDec, Variable, WhileExp,
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
  Arr
} = require("../../ast");

const fixture = {
  binaryOperators: [
    String.raw`1 or 0`,
    [new BinaryExp("or", new Literal(1), new Literal(0))]
  ],
  binaryOperators2: [
    String.raw`1 and 0`,
    [new BinaryExp("and", new Literal(1), new Literal(0))]
  ],
  binaryOperators3: [
    String.raw`1 + 0`,
    [new BinaryExp("+", new Literal(1), new Literal(0))]
  ],
  binaryOperators4: [
    String.raw`1 * 2`,
    [new BinaryExp("*", new Literal(1), new Literal(2))]
  ],
  binaryOperators5: [
    String.raw`10 <= 100`,
    [new BinaryExp("<=", new Literal(10), new Literal(100))]
  ],
  binaryOperators6: [
    String.raw`2 ** 3`,
    [new BinaryExp("**", new Literal(2), new Literal(3))]
  ],
  negation: [
    String.raw`-200 + 100`,
    [new BinaryExp("+", new NegationExp(new Literal(200)), new Literal(100))]
  ],
  hello: [
    String.raw`hiss("Hello, world")`,
    [new Print(new Literal("Hello, world"))]
  ],
  assignment: [
    String.raw`c = 1000`,
    [[new Assignment("=", new IdExp("c"), new Literal(1000))]]
  ],
  whileLoop: [
    String.raw`
    while 1 < 5:
    ⇨hiss("Hello World")
    ⇦
    `,
    [
      new WhileExp(
        new BinaryExp("<", new Literal(1), new Literal(5)),
        new Suite([new Print(new Literal("Hello World"))])
      )
    ]
  ],
  forLoop: [
    String.raw`
    for i in snek:
    ⇨hiss("Hello World")
    ⇦
    `,
    [
      new ForExp(
        new IdExp("i"),
        new IdExp("snek"),
        new Suite([new Print(new Literal("Hello World"))])
      )
    ]
  ],
  calls: [
    String.raw`
    foo(5, 10)
    `,

    [
      new Call(new IdExp("foo"), [
        new Argument(null, new Literal(5)),
        new Argument(null, new Literal(10))
      ])
    ]
  ],
  subscripted: [
    String.raw`
    foo[0]
    `,
    [new SubscriptedRangeable(new IdExp("foo"), new Literal(0), null)]
  ],
  assignmentOfLvals: [
    String.raw`
    foo[0] = 100
    `,
    [
      new Assignment(
        "=",
        new SubscriptedRangeable(new IdExp("foo"), new Literal(0), null),
        new Literal(100)
      )
    ]
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
        new BinaryExp("<", new IdExp("i"), new Literal(1)),
        new Suite([new Print(new Literal("i is less than 1"))]),
        [new BinaryExp(">", new IdExp("i"), new Literal(1))],
        [new Suite([new Print(new Literal("i is greater than 1"))])],
        new Suite([new Print(new Literal("i is equivalent to 1"))])
      )
    ]
  ],

  breaks: [
    String.raw`
  break
  `,
    [new Break()]
  ],
  rules: [
    String.raw`
      @ > 100
    `,
    [new Rule(">", [new Literal(100)])]
  ],
  arrays: [
    String.raw`
      [1, 2, 3, 4]
    `,
    [new Arr([new Literal(1), new Literal(2), new Literal(3), new Literal(4)])]
  ]

  // breaks: [
  //   String.raw`while 0 do (break; break)`,
  //   new WhileExp(new Literal(0), new ExpSeq([new Break(), new Break()])),
  // ],

  // forAndIf: [
  //   String.raw`for i := 0 to 9 do if i then i := 100`,
  //   new ForExp(
  //     'i',
  //     new Literal(0),
  //     new Literal(9),
  //     new IfExp(new IdExp('i'), new Assignment(new IdExp('i'), new Literal(100)), null),
  //   ),
  // ],

  // simpleFunction: [
  //   String.raw`let
  //     function addTwo(x: int): int = x + 2
  //   in
  //     addTwo(ord("dog"))
  //   end`,
  //   new LetExp(
  //     [new Func('addTwo', [new Param('x', 'int')], 'int',
  //       new BinaryExp('+', new IdExp('x'), new Literal(2)))],
  //     [new Call('addTwo', [new Call('ord', [new Literal('dog')])])],
  //   ),
  // ],

  // emptyParameters: [
  //   String.raw`f()`,
  //   new Call('f', []),
  // ],

  // arrays: [
  //   String.raw`let type list = array of int var x: list := list [1] of -9 in x[0] end`,
  //   new LetExp(
  //     [
  //       new TypeDec('list', new ArrayType('int')),
  //       new Variable('x', 'list',
  //         new ArrayExp('list', new Literal(1), new NegationExp(new Literal(9)))),
  //     ],
  //     [new SubscriptedExp(new IdExp('x'), new Literal(0))],
  //   ),
  // ],

  // records: [
  //   String.raw`let
  //     type point = {x: int, y: int}
  //     var p: point := nil
  //   in
  //     print(point{x=1, y=8});
  //     p.y * 3 | 5
  //   end`,
  //   new LetExp(
  //     [
  //       new TypeDec('point', new RecordType([new Field('x', 'int'), new Field('y', 'int')])),
  //       new Variable('p', 'point', new Nil()),
  //     ],
  //     [
  //       new Call('print', [new RecordExp(
  //         'point', [new Binding('x', new Literal(1)), new Binding('y', new Literal(8))],
  //       )]),
  //       new BinaryExp(
  //         '|',
  //         new BinaryExp('*', new MemberExp(new IdExp('p'), 'y'), new Literal(3)),
  //         new Literal(5),
  //       ),
  //     ],
  //   ),
  // ],
};

describe("The parser", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test("throws an exception on a syntax error", done => {
    expect(() => parse("as$df^&%*$&")).toThrow();
    done();
  });
});

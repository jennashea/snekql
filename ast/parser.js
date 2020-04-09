const fs = require("fs");
const ohm = require("ohm-js");
const path = require("path");
const {
  Program,
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
  VariableDeclaration,
} = require("./index");

const grammar = ohm.grammar(
  fs.readFileSync(path.resolve(__dirname, "../grammar/snekql.ohm"))
);

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation("ast", {
  Program(s) {
    return new Program(s.ast());
  },
  Statement_if(
    _if,
    firstCondition,
    _firstColon,
    firstSuite,
    _elif,
    potentialConditions,
    _potentialColons,
    potentialBlocks,
    _else,
    _elseColon,
    elseCaseSuite
  ) {
    return new IfStmt(
      firstCondition.ast(),
      firstSuite.ast(),
      potentialConditions.ast(),
      potentialBlocks.ast(),
      arrayToNullable(elseCaseSuite.ast())
    );
  },
  Statement_while(_while, condition, _colon, suite) {
    return new WhileExp(condition.ast(), suite.ast());
  },
  Statement_for(_for, id, _in, iterable, _colon, suite) {
    return new ForExp(id.ast(), iterable.ast(), suite.ast());
  },
  Statement_assign(target, assignment, source) {
    return new Assignment(assignment.ast(), target.ast(), source.ast());
  },
  Suite(indent, stmt, dedent) {
    return new Suite(stmt.ast());
  },
  Lvalue_subscripted(lval, _open, exp, _colon, exp2, _close) {
    return new SubscriptedRangeable(
      lval.ast(),
      exp.ast(),
      arrayToNullable(exp2.ast())
    );
  },
  Lvalue_field(lval, _dot, callOrID) {
    return new Member(lval.ast(), callOrID.ast());
  },
  Lvalue_id(lval) {
    return lval.ast();
  },

  VarDec(_let, id, _assignop, source) {
    return new VariableDeclaration(
      id.ast(),
      null,
      arrayToNullable(source.ast())
    );
  },
  Rule(_atSign, operator, expressions) {
    return new Rule(operator.ast(), expressions.ast());
  },
  Arr(_open, expressions, _close) {
    return new Arr(expressions.ast());
  },
  Statement_break(_break) {
    return new Break();
  },
  FunDec(_fnc, id, parameters, _colon, suite) {
    return new FunctionDeclaration(id.ast(), parameters.ast(), suite.ast());
  },
  Param(id, _colon, type) {
    return new Param(id.ast(), type.ast());
  },
  Params(_open, parameters, _close) {
    return new Params(parameters.ast());
  },
  Type_array(array, _open, type, _close) {
    return new ArrayType(array.ast(), type.ast());
  },
  Type(types) {
    return new Types(types.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp4_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp5_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp6_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp7_negation(_negative, operand) {
    return new NegationExp(operand.ast());
  },
  Literal_null(_null) {
    return new null();
  },
  Call(callee, _open, args, _close) {
    return new Call(callee.ast(), args.ast());
  },
  NonemptyListOf(first, _separator, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  Return_returnExpression(_keyword, expression) {
    return new Return(expression.ast());
  },
  Argument(id, _assignment, expression) {
    return new Argument(arrayToNullable(id.ast()), expression.ast());
  },
  numlit(whole, dot, fraction) {
    return new Literal(+this.sourceString);
  },
  Print(_open, expression, _close) {
    return new Print(expression.ast());
  },
  strlit(_openQuote, chars, _closeQuote) {
    return new Literal(this.sourceString.slice(1, -1));
  },
  boolit(value) {
    return new Literal(value.sourceString);
  },
  id(_firstChar, _restChars) {
    return new IdExp(this.sourceString);
  },
  indent(indentChar) {
    return indentChar.sourceString;
  },
  dedent(dedentChar) {
    return dedentChar.sourceString;
  },
  assignop(operator) {
    return operator.ast();
  },
  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};

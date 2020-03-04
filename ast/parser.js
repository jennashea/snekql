const fs = require('fs');
const ohm = require('ohm-js');
const {
  // ArrayExp, ArrayType, Assignment, BinaryExp, Binding, Break, Call, ExpSeq, Field,
  // ForExp, Func, IdExp, IfExp, LetExp, Literal, MemberExp, NegationExp, Nil, Param,
  // RecordExp, RecordType, SubscriptedExp, TypeDec, Variable, WhileExp,
  BinaryExp, Literal, IdExp, Print, Assignment
} = require('./index');

const grammar = ohm.grammar(fs.readFileSync('grammar/snekql.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  // Exp_let(_let, decs, _in, body, _end) {
  //   return new LetExp(decs.ast(), body.ast());
  // },
  // Exp_assign(target, _gets, source) {
  //   return new Assignment(target.ast(), source.ast());
  // },
  VarDec(target, operator, source){
    return new Assignment(operator.ast(), target.ast(), source.ast());
  },
  // Binding(id, _eq, value) {
  //   return new Binding(id.ast(), value.ast());
  // },
  // TypeDec(_type, id, _is, type) {
  //   return new TypeDec(id.ast(), type.ast());
  // },
  // Exp_if(_if, test, _then, consequent, _else, alternate) {
  //   return new IfExp(test.ast(), consequent.ast(), arrayToNullable(alternate.ast()));
  // },
  // Exp_while(_while, test, _do, body) {
  //   return new WhileExp(test.ast(), body.ast());
  // },
  // Exp_for(_for, id, _gets, initial, _to, test, _do, body) {
  //   return new ForExp(id.sourceString, initial.ast(), test.ast(), body.ast());
  // },
  // Exp_break(_break) {
  //   return new Break();
  // },
  // ArrayType(_array, _of, id) {
  //   return new ArrayType(id.ast());
  // },
  // RecordType(_open, fieldDecs, _close) {
  //   return new RecordType(fieldDecs.ast());
  // },
  // FunDec(_fun, id, params, _colon, typeid, _eq, body) {
  //   return new Func(id.ast(), params.ast(), arrayToNullable(typeid.ast()), body.ast());
  // },
  // VarDec(_var, id, _colon, typeid, _gets, init) {
  //   return new Variable(id.ast(), arrayToNullable(typeid.ast()), init.ast());
  // },
  // Field(id, _colon, typeid) {
  //   return new Field(id.ast(), typeid.ast());
  // },
  // Params(_open, params, _close) {
  //   return params.ast();
  // },
  // Param(id, _colon, typeid) {
  //   return new Param(id.ast(), typeid.ast());
  // },
  Exp1_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  // Exp2_binary(left, op, right) {
  //   return new BinaryExp(op.ast(), left.ast(), right.ast());
  // },
  // Exp3_binary(left, op, right) {
  //   return new BinaryExp(op.ast(), left.ast(), right.ast());
  // },
  // Exp4_binary(left, op, right) {
  //   return new BinaryExp(op.ast(), left.ast(), right.ast());
  // },
  // Exp5_binary(left, op, right) {
  //   return new BinaryExp(op.ast(), left.ast(), right.ast());
  // },
  // Exp6_binary(left, op, right) {
  //   return new BinaryExp(op.ast(), left.ast(), right.ast());
  // },
  // Exp7_negation(_negative, operand) {
  //   return new NegationExp(operand.ast());
  // },
  // Literal_nil(_nil) {
  //   return new Nil();
  // },
  // Lvalue_id(id) {
  //   return new IdExp(id.ast());
  // },
  // Lvalue_subscripted(array, _open, subscript, _close) {
  //   return new SubscriptedExp(array.ast(), subscript.ast());
  // },
  // Lvalue_field(record, _dot, id) {
  //   return new MemberExp(record.ast(), id.ast());
  // },
  // ArrayExp(type, _open, size, _close, _of, fill) {
  //   return new ArrayExp(type.ast(), size.ast(), fill.ast());
  // },
  // RecordExp(type, _open, bindings, _close) {
  //   return new RecordExp(type.ast(), bindings.ast());
  // },
  // Call(callee, _open, args, _close) {
  //   return new Call(callee.ast(), args.ast());
  // },
  // ExpSeq(_open, exps, _close) {
  //   return new ExpSeq(exps.ast());
  // },
  // NonemptyListOf(first, _separator, rest) {
  //   return [first.ast(), ...rest.ast()];
  // },
  // EmptyListOf() {
  //   return [];
  // },

  numlit(whole, dot, fraction) {
    return new Literal(+this.sourceString);
  },
  Print(_open, expression, _close){
    return new Print(expression.ast());
  },
  strlit(_openQuote, chars, _closeQuote) {
    return new Literal(this.sourceString.slice(1, -1));
  },
  id(_firstChar, _restChars) {
    return new IdExp(this.sourceString);
  },
  assignop(operator){
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

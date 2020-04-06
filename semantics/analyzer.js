// The semantic analyzer

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
} = require("../ast");
const { IntType, StringType } = require("./builtins");
const check = require("./check");
const Context = require("./context");

module.exports = function(exp) {
  exp.analyze(Context.INITIAL);
};

Break.prototype.analyze = function(context) {
  check.inLoop(context, "break");
};

BinaryExp.prototype.analyze = function(context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/[-+*/&|]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isIntegerOrString(this.left);
    check.isIntegerOrString(this.right);
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
  }
  this.type = IntType;
};

Assignment.prototype.analyze = function(context) {
  this.source.analyze(context);
};

Call.prototype.analyze = function(context) {
  this.callee = context.lookup(this.callee);
  check.isFunction(this.callee, "Attempt to call a non-function");
  this.args.forEach((arg) => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
  this.type = this.callee.returnType;
};

IdExp.prototype.analyze = function(context) {
  this.ref = context.lookup(this.ref);
  this.type = this.ref.type;
};

Literal.prototype.analyze = function() {
  if (typeof this.value === "number") {
    this.type = IntType;
  } else {
    this.type = StringType;
  }
};

NegationExp.prototype.analyze = function(context) {
  this.operand.analyze(context);
  check.isInteger(this.operand, "Operand of negation");
  this.type = IntType;
};

WhileExp.prototype.analyze = function(context) {
  this.test.analyze(context);
  check.isInteger(this.test, "Test in while");
  this.body.analyze(context.createChildContextForLoop());
};

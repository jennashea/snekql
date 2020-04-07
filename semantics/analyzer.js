// The semantic analyzer

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
} = require("../ast");
const { IntType, StringType } = require("./builtins");
const check = require("./check");
const Context = require("./context");

module.exports = function(exp) {
  exp.analyze(Context.INITIAL);
};

Program.prototype.analyze = function(context) {
  this.statements.forEach((s) => s.analyze(context));
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

VariableDeclaration.prototype.analyze = function(context) {
  this.id.analyze(context);
  this.type = this.optionalSource.type;
  context.add(this);
};

// Needs function declarations to be defined
Call.prototype.analyze = function(context) {
  this.callee = context.lookup(this.callee);
  check.isFunction(this.callee, "Attempt to call a non-function");
  this.args.forEach((arg) => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
  this.type = this.callee.returnType;
};

IdExp.prototype.analyze = function(context) {
  this.ref = context.lookup(this.ref);
  // this.type = this.ref.type;
};

Literal.prototype.analyze = function() {
  if (typeof this.value === "number") {
    this.type = IntType;
  } else {
    this.type = StringType;
  }
};

Print.prototype.analyze = function(context) {
  this.expression.analyze(context);
};

NegationExp.prototype.analyze = function(context) {
  this.operand.analyze(context);
  check.isInteger(this.operand, "Operand of negation");
  this.type = IntType;
};

WhileExp.prototype.analyze = function(context) {
  this.test.analyze(context);
  check.isInteger(this.test, "Test in while");

  const suiteContext = context.createChildContextForLoop();
  this.body.stmt.forEach((s) => s.analyze(suiteContext));
};

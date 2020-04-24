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
} = require('../ast');
const {
  IntType,
  StringType,
  DoubleType,
  BooleanType,
  ArrayOfIntType,
  ArrayOfStringType,
  ArrayOfBooleanType,
  ArrayOfDoubleType,
} = require('./builtins');
const check = require('./check');
const Context = require('./context');

module.exports = function (exp) {
  exp.analyze(Context.INITIAL);
};

Program.prototype.analyze = function (context) {
  this.statements
    .filter(d => d.constructor === FunctionDeclaration)
    .map(d => d.analyzeSignature(context));
  this.statements.forEach(s => {
    s.analyze(context);
  });
};

Arr.prototype.analyze = function (context) {
  this.expressions.forEach(e => e.analyze(context));
  check.arrayAllSameType(this.expressions);
  let arrType = this.expressions[0].type.id;
  if (arrType == 'int') {
    this.type = ArrayOfIntType;
  } else if (arrType == 'str') {
    this.type = ArrayOfStringType;
  } else if (arrType == 'boo') {
    this.type = ArrayOfBooleanType;
  } else if (arrType == 'dub') {
    this.type = ArrayOfDoubleType;
  }
  this.iterator = this.type.types;
};

ArrayType.prototype.analyze = function (context) {};

Assignment.prototype.analyze = function (context) {
  this.source.analyze(context);
  this.target.analyze(context);
};

Argument.prototype.analyze = function (context) {
  this.expression.analyze(context);
};

Break.prototype.analyze = function (context) {
  check.inLoop(context, 'break');
};

BinaryExp.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/[-+*/&|]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
    this.type = IntType;
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isInteger(this.left);
    check.isInteger(this.right);
    this.type = BooleanType;
  }
};

VariableDeclaration.prototype.analyze = function (context) {
  if (this.optionalSource != null) {
    this.optionalSource.analyze(context);
    this.type = this.optionalSource.type;
  }
  context.add(this);
};

Call.prototype.analyze = function (context) {
  this.callee = context.lookup(this.callee.ref);
  check.isFunction(this.callee, 'Attempt to call a non-function');
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.callee.parameters.parameters);
};

FunctionDeclaration.prototype.analyzeSignature = function (context) {
  this.bodyContext = context.createChildContextForFunctionBody(this);
  this.parameters.analyze(this.bodyContext);
};

FunctionDeclaration.prototype.analyze = function (context) {
  this.suite.analyze(this.bodyContext);
  context.add(this);
  delete this.bodyContext;
};

IfStmt.prototype.analyze = function (context) {
  this.firstCondition.analyze(context);
  check.isBoolean(this.firstCondition);
  this.firstSuite.analyze(context);
  this.potentialConditions.forEach((condition, i) => {
    condition.analyze(context);
    check.isBoolean(condition);
    this.potentialBlocks[i].analyze(context);
  });
  this.elseCaseSuite.analyze(context);
};

IdExp.prototype.analyze = function (context) {
  this.ref = context.lookup(this.ref);
  this.type = this.ref.type;
};

Literal.prototype.analyze = function () {
  if (Number.isInteger(this.value)) {
    this.type = IntType;
  } else if (this.value % 1 >= 0 || this.value % 1 <= 0) {
    this.type = DoubleType;
  } else if (this.value === 'true' || this.value === 'false') {
    this.type = BooleanType;
  } else {
    this.type = StringType;
    this.iterator = this.type;
  }
};

NegationExp.prototype.analyze = function (context) {
  this.operand.analyze(context);
  check.isInteger(this.operand, 'Operand of negation');
  // TODO allow negation for doubles
  // Maaaaayyyyyybbbbe allow for arrays of numbers
  this.type = IntType;
};

Print.prototype.analyze = function (context) {
  this.expression.analyze(context);
};

Param.prototype.analyze = function (context) {
  this.type = context.lookup(this.type.id);
  context.add(this);
};

Params.prototype.analyze = function (context) {
  this.parameters.forEach(s => s.analyze(context));
};

Suite.prototype.analyze = function (context) {
  const suiteContext = context.createChildContextForBlock();
  this.stmt.forEach(s => s.analyze(suiteContext));
};

Return.prototype.analyze = function (context) {
  check.inFunction(context);
};

Rule.prototype.analyze = function (context) {
  this.expressions.analyze(context);
  check.isProperRule(this);
};

SubscriptedRangeable.analyze = function (context) {};

Types.prototype.analyze = function (context) {};

ForExp.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForLoop();
  this.iterable.analyze(context);
  check.isIterable(this.iterable);
  this.id = new VariableDeclaration(this.id, this.iterable.iterator);
  bodyContext.add(this.id);
  this.suite.analyze(bodyContext);
};

WhileExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isBoolean(this.test, 'Test in while');
  const suiteContext = context.createChildContextForLoop();
  this.body.analyze(suiteContext);
};

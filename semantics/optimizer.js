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

  module.exports = program => program.optimize();

//   function isZero(e) {
//     return e instanceof Literal && e.value === 0;
//   }
  
//   function isOne(e) {
//     return e instanceof Literal && e.value === 1;
//   }
  
//   function bothLiterals(b) {
//     return b.left instanceof Literal && b.right instanceof Literal;
//   }

Assignment.prototype.optimize = function() {
    this.target = this.target.optimize();
    this.source = this.source.optimize();
    if (this.target === this.source) {
      return null;
    }
    return this;
  };

  Binding.prototype.optimize = function() {
    this.value = this.value.optimize();
    return this;
  };
  
  Break.prototype.optimize = function() {
    return this;
  };

  ForExp.prototype.optimize = function() {
    this.low = this.low.optimize();
    this.high = this.high.optimize();
    this.body = this.body.optimize();
    return this;
  };
  
  Call.prototype.optimize = function() {
    this.args = this.args.map(a => a.optimize());
    this.callee = this.callee.optimize();
    return this;
  };

  IdExp.prototype.optimize = function() {
    return this;
  };

  IfExp.prototype.optimize = function() {
    this.test = this.test.optimize();
    this.consequent = this.consequent.optimize();
    this.alternate = this.alternate.optimize();
    if (isZero(this.test)) {
      return this.alternate;
    }
    return this;
  };

  Literal.prototype.optimize = function() {
    return this;
  };

  NegationExp.prototype.optimize = function() {
    this.operand = this.operand.optimize();
    if (this.operand instanceof Literal) {
      return new Literal(-this.operand.value);
    }
    return this;
  };

  Param.prototype.optimize = function() {
      //?
    return this;
  };

  WhileExp.prototype.optimize = function() {
    this.test = this.test.optimize();
    if (this.test instanceof Literal && !this.test.value) {
      return new Nil();
    }
    this.body = this.body.optimize();
    return this;
  };

  Program.prototype.optimize = function() {

  };

  BinaryExp.prototype.optimize = function() {

  };

  Print.prototype.optimize = function() {

  };

  Suite.prototype.optimize = function() {

  };

  Argument.prototype.optimize = function() {

  };

  SubscriptedRangeable.prototype.optimize = function() {

  };

  IfStmt.prototype.optimize = function() {

  };

  Rule.prototype.optimize = function() {

  };

  Arr.prototype.optimize = function() {

  };

  FunctionDeclaration.prototype.optimize = function() {

  };

  ArrayType.prototype.optimize = function() {
      
  };

  Types.prototype.optimize = function() {

  };

  Param.prototype.optimize = function() {

  };

  Params.prototype.optimize = function() {

  };

  Return.prototype.optimize = function() {

  };

  VariableDeclaration.prototype.optimize = function() {

  };

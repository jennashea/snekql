// Translation to JavaScript

const beautify = require('js-beautify');
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

  function makeOp(op) { // Is this needed?
    return { '=': '===', '<>': '!==', '&': '&&', '|': '||' }[op] || op;
  }




  module.exports = function(exp) {
    return beautify(exp.gen(), { indent_size: 2 });
  };

  // Do we need "function makeReturn(exp)" too? not sure

  Program.prototype.gen = function() {
    
  };

  BinaryExp.prototype.gen = function() {
    return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
  };

  Literal.prototype.gen = function() {
    return this.type === StringType ? `"${this.value}"` : this.value;

  };
  
  IdExp.prototype.gen = function() {
    return javaScriptId(this.ref);
  };

  Print.prototype.gen = function() {
    
  };

  Assignment.prototype.gen = function() {
    
  };

  NegationExp.prototype.gen = function() {
    return `(- (${this.operand.gen()}))`;
  };

  WhileExp.prototype.gen = function() {
    return `while (${this.test.gen()}) { ${this.body.gen()} }`;
  };

  Suite.prototype.gen = function() {
    
  };

  ForExp.prototype.gen = function() {
    const name = javaScriptId(this);
    const params = this.params.map(javaScriptId);
    const body = this.body.type ? makeReturn(this.body) : this.body.gen();
    return `function ${name} (${params.join(',')}) {${body}}`;
  };

  Call.prototype.gen = function() {
    const args = this.args.map(a => a.gen());
    if (this.callee.builtin) {
      return builtin[this.callee.id](args);
    }
    return `${javaScriptId(this.callee)}(${args.join(',')})`;
  };

  Argument.prototype.gen = function() {
    
  };

  SubscriptedRangeable.prototype.gen = function() {
    
  };

  IfStmt.prototype.gen = function() {
    
  };
  
  Break.prototype.gen = function() {
    return 'break';
  };

  Rule.prototype.gen = function() {
    
  };

  Arr.prototype.gen = function() {
    
  };

  FunctionDeclaration.prototype.gen = function() {
    
  };

  ArrayType.prototype.gen = function() {
    
  };

  Types.prototype.gen = function() {
    
  };

  Param.prototype.gen = function() {
    
  };

  Params.prototype.gen = function() {
    
  };

  Return.prototype.gen = function() {
    
  };

  VariableDeclaration.prototype.gen = function() {
    
  };











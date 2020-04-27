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
const {
  IntType,
  StringType,
  DoubleType,
  BooleanType,
  ArrayOfType,
  ArrayOfIntType,
  ArrayOfStringType,
  ArrayOfBooleanType,
  ArrayOfDoubleType,
} = require("../semantics/builtins");

// function makeOp(op) {
//   return {}[op]|| op;
// }

// function makeOp(op) { // Is this needed?
//   return { '=': '===', '<>': '!==', '&': '&&', '|': '||' }[op] || op;
// }

module.exports = function(exp) {
  return beautify(exp.gen(), { indent_size: 2 });
};

  // Do we need "function makeReturn(exp)" too? not sure
  
const javaScriptId = (() => {
  let lastId = 0;
  const map = new Map();
  return v => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

const builtin = {
  hiss([s]) {return `console.log(${s})`;},
}

Program.prototype.gen = function() {
  return
};

BinaryExp.prototype.gen = function() {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

Literal.prototype.gen = function() {
  return this.type === IntType ? `"${this.value}"` : this.value;
  return this.type === StringType ? `"${this.value}"` : this.value;
  return this.type === DoubleType ? `"${this.value}"` : this.value;
  return this.type === BooleanType ? `"${this.value}"` : this.value;
  return this.type === ArrayOfType ? `"${this.value}"` : this.value;
  return this.type === ArrayOfIntType ? `"${this.value}"` : this.value;
  return this.type === ArrayOfStringType ? `"${this.value}"` : this.value;
  return this.type === ArrayOfBooleanType ? `"${this.value}"` : this.value;
  return this.type === ArrayOfDoubleType ? `"${this.value}"` : this.value;
};

IdExp.prototype.gen = function() {
  return javaScriptId(this.ref);
};

Print.prototype.gen = function() {
  return
};

Assignment.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

NegationExp.prototype.gen = function() {
  return `(- (${this.operand.gen()}))`;
};

WhileExp.prototype.gen = function() {
  return `while (${this.test.gen()}) { ${this.body.gen()} }`;
};

Suite.prototype.gen = function() {
  return
};

ForExp.prototype.gen = function() {
  return
};

Call.prototype.gen = function() {
  const args = this.args.map(a => a.gen());
  if (this.callee.builtin) {
    return builtin[this.callee.id](args);
  }
  return `${javaScriptId(this.callee)}(${args.join(',')})`;
};

Argument.prototype.gen = function() {
  return
};

Null.prototype.gen = function() {
  return 'null';
};

Member.prototype.gen = function() {
  return `${this.record.gen()}.${this.id}`;
};

SubscriptedRangeable.prototype.gen = function() {
  return `${this.array.gen()}[${this.subscript.gen()}]`;
};

IfStmt.prototype.gen = function() {
  const thenPart = this.consequent.gen();
  const elsePart = this.alternate ? this.alternate.gen() : 'null';
  return `((${this.test.gen()}) ? (${thenPart}) : (${elsePart}))`;
};

Break.prototype.gen = function() {
  return 'break';
};

Rule.prototype.gen = function() {
  return
};

Arr.prototype.gen = function() {
  return
};

FunctionDeclaration.prototype.gen = function() {
  const name = javaScriptId(this);
  const params = this.params.map(javaScriptId);
  const body = this.body.type ? makeReturn(this.body) : this.body.gen();
  return `fnc ${name} (${params.join(',')}) {${body}}`;
};

ArrayType.prototype.gen = function() {
  return
};

Types.prototype.gen = function() {
  return
};

Param.prototype.gen = function() {
  return javaScriptId(this);
};

Params.prototype.gen = function() {
  return
};

Return.prototype.gen = function() {
  return `return ${this.returnValue ? this.returnValue.gen() : ''}`;
};

VariableDeclaration.prototype.gen = function() {
  return `let ${javaScriptId(this)} = ${this.init.gen()}`;
};

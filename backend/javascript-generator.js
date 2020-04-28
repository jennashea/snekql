const beautify = require("js-beautify");
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

function makeOp(op) {
  return { "=": "===", "!=": "!==" }[op] || op;
}

const javaScriptId = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    console.log(v);
    if (!map.has(v.id.ref)) {
      map.set(v.id.ref, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id.ref}_${map.get(v.id.ref)}`;
  };
})();

module.exports = function (exp) {
  return beautify(exp.gen(), { indent_size: 2 });
};

Program.prototype.gen = function () {
  return this.statements.map((s) => s.gen()).join(";");
};

BinaryExp.prototype.gen = function () {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

Literal.prototype.gen = function () {
  if (this.type == IntType || this.type == DoubleType) return this.value;
  else return `"${this.value}"`;
};

IdExp.prototype.gen = function () {
  return javaScriptId(this.ref);
};

Print.prototype.gen = function () {
  return `console.log(${this.expression.gen()})`;
};

Assignment.prototype.gen = function () {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

NegationExp.prototype.gen = function () {
  return `(- (${this.operand.gen()}))`;
};

WhileExp.prototype.gen = function () {
  return `while (${this.test.gen()}) { ${this.body.gen()} }`;
};

Suite.prototype.gen = function () {
  return this.stmt.map((s) => s.gen()).join(";");
};

ForExp.prototype.gen = function () {
  return `for (${this.iterable.gen()}) { ${this.suite.gen()} }`;
};

Call.prototype.gen = function () {
  const args = this.args.map((a) => a.gen());
  if (this.callee.builtin) {
    return builtin[this.callee.id](args);
  }
  return `${javaScriptId(this.callee)}(${args.join(",")})`;
};

Argument.prototype.gen = function () {
  return this.expression.gen();
};

Null.prototype.gen = function () {
  return "null";
};

SubscriptedRangeable.prototype.gen = function () {
  return `${this.array.gen()}[${this.subscript.gen()}]`;
};

IfStmt.prototype.gen = function () {
  const thenPart = this.consequent.gen();
  const elsePart = this.alternate ? this.alternate.gen() : "null";
  return `((${this.test.gen()}) ? (${thenPart}) : (${elsePart}))`;
};

Break.prototype.gen = function () {
  return "break";
};

Rule.prototype.gen = function () {
  return this.expressions.gen();
};

Arr.prototype.gen = function () {
  return this.expressions.map((e) => e.gen()).join(";");
};

FunctionDeclaration.prototype.gen = function () {
  const name = javaScriptId(this);
  const params = this.params.map(javaScriptId);
  const body = this.body.type ? makeReturn(this.body) : this.body.gen();
  return `fnc ${name} (${params.join(",")}) {${body}}`;
};

// ArrayType.prototype.gen = function () {
//   return;
// }; // we might not need this since there isn't a analyzing part???

// Types.prototype.gen = function () {
//   return;
// }; // we might not need this since there isn't a analyzing part???

Param.prototype.gen = function () {
  return javaScriptId(this);
};

Params.prototype.gen = function () {
  return this.parameters.map((s) => s.gen()).join(";");
};

Return.prototype.gen = function () {
  return `return ${this.returnValue ? this.returnValue.gen() : ""}`;
};

VariableDeclaration.prototype.gen = function () {
  console.log(this);
  return `let ${javaScriptId(this)} = ${this.optionalSource.gen()}`;
};

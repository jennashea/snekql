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
    let id = typeof v === "string" ? v : v.id.ref;
    if (!map.has(id)) {
      map.set(id, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${id}_${map.get(id)}`;
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
  if (this.type == StringType) return `"${this.value}"`;
  else return this.value;
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
  return `for (const ${javaScriptId(
    this.id
  )} of ${this.iterable.gen()}) { ${this.suite.gen()} }`;
};

Call.prototype.gen = function () {
  const args = this.args.map((a) => a.gen());
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
  let statements = `if(${this.firstCondition.gen()}){${this.firstSuite.gen()}}`;
  if (this.potentialConditions != null)
    this.potentialConditions.forEach((s, i) => {
      statements.concat(`
        else if(${s.gen()}) {${this.potentialBlocks[i].gen()}}
          `);
    });
  return statements;
};

Break.prototype.gen = function () {
  return "break;";
};

Rule.prototype.gen = function () {
  return `(value) => value ${makeOp(this.operator)} ${this.expressions.gen()}`;
};

Arr.prototype.gen = function () {
  return `[${this.expressions.map((e) => e.gen()).join(",")}]`;
};

FunctionDeclaration.prototype.gen = function () {
  const name = javaScriptId(this);
  const suite = this.suite.gen();
  return `function ${name} (${this.parameters.gen()}) {${suite}}`;
};

Param.prototype.gen = function () {
  return javaScriptId(this);
};

Params.prototype.gen = function () {
  return this.parameters.map((s) => s.gen()).join(";");
};

Return.prototype.gen = function () {
  return `return ${this.expression.gen()}`;
};

VariableDeclaration.prototype.gen = function () {
  if (this.optionalSource !== null)
    return `let ${javaScriptId(this)} = ${this.optionalSource.gen()}`;
  else return `let ${javaScriptId(this)}`;
};

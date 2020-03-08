class Argument {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }
}
class Assignment {
  constructor(operator, target, source) {
    Object.assign(this, { operator, target, source });
  }
}

class BinaryExp {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
}
class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }
}
class ForExp {
  constructor(id, iterable, suite) {
    Object.assign(this, { id, iterable, suite });
  }
}

class IfStmt {
  constructor(
    firstCondition,
    firstSuite,
    potentialConditions,
    potentialBlocks,
    elseCaseSuite
  ) {
    Object.assign(this, {
      firstCondition,
      firstSuite,
      potentialConditions,
      potentialBlocks,
      elseCaseSuite
    });
  }
}

class IdExp {
  constructor(ref) {
    Object.assign(this, { ref });
  }
}

class Literal {
  constructor(value) {
    Object.assign(this, { value });
  }
}

class NegationExp {
  constructor(operand) {
    Object.assign(this, { operand });
  }
}

class Print {
  constructor(expression) {
    Object.assign(this, { expression });
  }
}
class Suite {
  constructor(stmt) {
    Object.assign(this, { stmt });
  }
}
class WhileExp {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}
class SubscriptedRangeable {
  constructor(target, firstExp, secondExp) {
    Object.assign(this, { target, firstExp, secondExp });
  }
}
class Member {
  constructor(target, firstExp, secondExp) {
    Object.assign(this, { target, firstExp, secondExp });
  }
}
class Rule {
  constructor(operator, expressions) {
    Object.assign(this, { operator, expressions });
  }
}
class Arr {
  constructor(expressions) {
    Object.assign(this, { expressions });
  }
}

class Break {}

class Null {}

if (process.argv[2] == "-a") {
  const fs = require("fs");
  const parse = require("./parser");
  const source = fs.readFileSync(process.argv[3]);

  console.log(parse(source));
}

module.exports = {
  BinaryExp,
  IdExp,
  Literal,
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
  Arr
};

// class ArrayExp {
//   constructor(type, size, fill) {
//     Object.assign(this, { type, size, fill });
//   }
// }

// class ArrayType {
//   constructor(memberType) {
//     Object.assign(this, { memberType });
//   }
// }
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
// class Binding {
//   constructor(id, value) {
//     Object.assign(this, { id, value });
//   }
// }

// class Break {
// }

// class ExpSeq {
//   constructor(exps) {
//     Object.assign(this, { exps });
//   }
// }

// class Field {
//   constructor(id, type) {
//     Object.assign(this, { id, type });
//   }
// }

// class Func {
//   constructor(id, params, returnType, body) {
//     Object.assign(this, { id, params, returnType, body });
//   }
// }

// class IfExp {
//   constructor(test, consequent, alternate) {
//     Object.assign(this, { test, consequent, alternate });
//   }
// }

// class LetExp {
//   constructor(decs, body) {
//     Object.assign(this, { decs, body });
//   }
// }

// class MemberExp {
//   constructor(record, id) {
//     Object.assign(this, { record, id });
//   }
// }

class Null {}

// class Param {
//   constructor(id, type) {
//     Object.assign(this, { id, type });
//   }
// }

// class PrimitiveType {
//   constructor(id) {
//     Object.assign(this, { id });
//   }
// }

// class RecordExp {
//   constructor(type, bindings) {
//     Object.assign(this, { type, bindings });
//   }
// }

// class RecordType {
//   constructor(fields) {
//     Object.assign(this, { fields });
//   }
// }

// class SubscriptedExp {
//   constructor(array, subscript) {
//     Object.assign(this, { array, subscript });
//   }
// }

// class TypeDec {
//   constructor(id, type) {
//     Object.assign(this, { id, type });
//   }
// }

// class Variable {
//   constructor(id, type, init) {
//     Object.assign(this, { id, type, init });
//   }
// }

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
  Null
  // ArrayExp, ArrayType, Assignment, BinaryExp, Binding, Break, Call, ExpSeq, Field,
  // ForExp, Func, IdExp, IfExp, LetExp, Literal, MemberExp, NegationExp, Nil, Param,
  // PrimitiveType, RecordExp, RecordType, SubscriptedExp, TypeDec, Variable, WhileExp,
};

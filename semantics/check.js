const util = require("util");
const { ArrayType, FunctionDeclaration, IdExp } = require("../ast");
const { IntType, StringType, BooleanType, DoubleType } = require("./builtins");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isInteger(expression) {
    doCheck(expression.type === IntType, "Not an integer");
  },
  isDouble(expression) {
    doCheck(expression.type === DoubleType, "Not a double");
  },
  isBoolean(expression) {
    doCheck(expression.type === BooleanType, "Not a boolean");
  },
  isString(expression) {
    doCheck(expression.type === StringType, "Not a string");
  },

  isIntegerOrString(expression) {
    doCheck(
      expression.type === IntType || expression.type === StringType,
      "Not an integer or string"
    );
  },

  isFunction(value) {
    doCheck(value.constructor === FunctionDeclaration, "Not a function");
  },

  expressionsHaveTheSameType(e1, e2) {
    doCheck(e1.type === e2.type, "Types must match exactly");
  },
  isAssignableTo(expression, type) {
    console.log(expression);
    console.log(type);
    doCheck(
      expression.type === type,
      `Expression of type ${util.format(
        expression.type
      )} not compatible with type ${util.format(type)}`
    );
  },
  inLoop(context, keyword) {
    doCheck(context.inLoop, `${keyword} can only be used in a loop`);
  },
  // Same number of args and params; all types compatible
  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach((arg, i) =>
      this.isAssignableTo(arg.expression, params[i].type)
    );
  },
};

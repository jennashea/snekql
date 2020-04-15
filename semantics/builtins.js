const {
  Types,
  ArrayType,
  FunctionDeclaration,
  Params,
  Param,
  IdExp,
} = require("../ast");

const IntType = new Types("int");
const StringType = new Types("str");
const BooleanType = new Types("boo");
const DoubleType = new Types("dub");

const ArrayOfIntType = new ArrayType("arr", new Types("int"));
const ArrayOfStringType = new ArrayType("arr", new Types("str"));
const ArrayOfBooleanType = new ArrayType("arr", new Types("boo"));
const ArrayOfDoubleType = new ArrayType("arr", new Types("dub"));

const standardFunctions = [
  new FunctionDeclaration(new IdExp("tabulate")),
  new FunctionDeclaration(
    new IdExp("addRow"),
    new Params([new Param(new IdExp("row"), ArrayOfStringType)])
  ),
  new FunctionDeclaration(
    new IdExp("addColumn"),
    new Params([new Param(new IdExp("column"), ArrayOfStringType)])
  ),
  new FunctionDeclaration(
    new IdExp("dropRow"),
    new Params([new Param(new IdExp("row"), ArrayOfStringType)])
  ),
  new FunctionDeclaration(
    new IdExp("dropColumn"),
    new Params([new Param(new IdExp("column"), ArrayOfStringType)])
  ),
  new FunctionDeclaration(
    new IdExp("addRule"),
    new Params([new Param(new IdExp("column"), BooleanType)])
  ),
];

module.exports = {
  IntType,
  StringType,
  BooleanType,
  DoubleType,
  ArrayOfIntType,
  ArrayOfStringType,
  ArrayOfBooleanType,
  ArrayOfDoubleType,
  standardFunctions,
};

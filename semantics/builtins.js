const { Types, ArrayType } = require("../ast");

const IntType = new Types("int");
const StringType = new Types("str");
const BooleanType = new Types("boo");
const DoubleType = new Types("dub");

const ArrayOfIntType = new ArrayType("arr", new Types("int"));
const ArrayOfStringType = new ArrayType("arr", new Types("str"));
const ArrayOfBooleanType = new ArrayType("arr", new Types("boo"));
const ArrayOfDoubleType = new ArrayType("arr", new Types("dub"));

module.exports = {
    IntType,
    StringType,
    BooleanType,
    DoubleType,
    ArrayOfIntType,
    ArrayOfStringType,
    ArrayOfBooleanType,
    ArrayOfDoubleType,
};

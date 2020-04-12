const { Types } = require("../ast");

const IntType = new Types("int");
const StringType = new Types("str");
const BooleanType = new Types("boo");
const DoubleType = new Types("dub");

module.exports = {
    IntType,
    StringType,
    BooleanType,
    DoubleType,
};

/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require("../../ast/parser");
const analyze = require("../analyzer");

const program = String.raw`
2+2
5*100/1000-100
hiss("hello world")
-100 + 2000

let a = 10
let b = 20

a = 1000*a*b
let c

while 1 < 10:
  hiss("hello world")
  b += 100
  c = 10000
  let d = 1000
  hiss(d)

fnc batmanSong(times:int, another:str):
  let na = times*13
  hiss(na)
  return "na"

@ > 25
@ > 99.9
@ == true

batmanSong(100, "brandon")

[1, 2, 3, 4, 5]
let names = ["brandon", "jenna", "jared", "imani", "alvin", "qiyue"]
[1.1 , 2.2, 3.3, 4.4, 5.5]
[true, false, true,  false]
[1]

names[0]
names[1:4]

for i in "brandon":
  hiss(i)
let empty = null
let i = 100

if i < 1:
  hiss("i is less than 1")
elif i > 1:
  hiss("i is greater than 1")
else:
  hiss("i is equivalent to 1")

while 1 <= 10:
  hiss("hello world")

`;

describe("The semantic analyzer", () => {
  test("accepts the mega program with all syntactic forms", (done) => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});

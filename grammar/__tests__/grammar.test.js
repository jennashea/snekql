/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
rule1 = @ >= 390284
[2, 3, 4]
null
for x in range(10):
    print(x)
a = 20 // 1
b = 199.9219
20 % 3
a += 3
while 1:
  a *= 2
  if a >= 100:
    break
`;

const program2 = String.raw`
firstName = column("name", ["Jenna", "Jared"], true, false)
firstName.name  # 'name'
firstName.value  # ["Jenna", "Jared"]
firstName.notNull  # true
firstName.unique  # false
firstName.addRow("Brandon")  # ["Jenna", "Jared", "Brandon"]
`;

const arithmetic = String.raw`
5 + 1
2 - 199
100 / 2
2 * 2
2 * 100 + 1 / 10
2 * 2 * 2 * 2
2 - 1 * 100
`;

const comments = String.raw`
~~~
Simple Program Below that Performs Some Calculations
1.
2. 
3.  
~~~:
# TODO

`;

const loops = String.raw`
for i in range(10):
    hiss(i)

while i < 10:
    hiss(10**i)
    i += 1
`;

const integerDivision = String.raw`10 // 4`;

const decimals = String.raw`a = 1.4`;

const leftValues = String.raw`
arr[0] = [1, 2, 3, 4]
dict[5  * 100]
# NOT OK myArray[if a > b: hiss("yay")]
# NOT OK myArray[for something in data: hiss(something)]
`;

const if_statements = String.raw`
if a or b: c = "NO" elif a and b: c = "YES" else c = "???"
`;

const if_statements2 = String.raw`
if a > b:
    hiss("a is greater than b")
else
    hiss("b and a definitely numbers")
`;
const if_statements3 = String.raw`
if a > b:
    hiss("a is greater than b")
elif b > a:
    hiss("b is greater than a")
`;
const if_statements4 = String.raw`
if a > b:
    hiss("a is greater than b")
`;


describe('The syntax checker', () => {
  describe('large programs', () => {
    test('with all syntactic forms', (done) => {
      expect(syntaxCheck(program)).toBe(true);
      done();
    });
    test('with columns example', (done) => {
      expect(syntaxCheck(program2)).toBe(true);
      done();
    });
  });
  describe('individual tests', () => {
    test('comments', (done) => {
      expect(syntaxCheck(comments)).toBe(true);
      done();
    });

    test('integer division', (done) => {
      expect(syntaxCheck(integerDivision)).toBe(true);
      done();
    });

    test('decimals', (done) => {
      expect(syntaxCheck(decimals)).toBe(true);
      done();
    });

    test('loops', (done) => {
      expect(syntaxCheck(loops)).toBe(true);
      done();
    });

    test('arithmetic', (done) => {
      expect(syntaxCheck(arithmetic)).toBe(true);
      done();
    });

    test('leftValues', (done) => {
      expect(syntaxCheck(leftValues)).toBe(true);
      done();
    });

    test('if_statements', (done) => {
      expect(syntaxCheck(if_statements)).toBe(true);
      done();
    });

    test('if_statements2', (done) => {
      expect(syntaxCheck(if_statements2)).toBe(true);
      done();
    });

    test('if_statements3', (done) => {
      expect(syntaxCheck(if_statements3)).toBe(true);
      done();
    });

    test('if_statements4', (done) => {
      expect(syntaxCheck(if_statements4)).toBe(true);
      done();
    });
  });
});

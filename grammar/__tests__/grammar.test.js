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
a = 20
20 % 3
a += 3
while 1:
  a *= 2
  if a >= 100:
    break
`;

const comments = String.raw`
# teslkjsdlkfj
~~~
MULTILINES COMMENTS YAY
SDKFJLS;KDJFALKSJDF
~~~:

`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
  test('comments', (done) => {
    expect(syntaxCheck(comments)).toBe(true);
    done();
  });
});

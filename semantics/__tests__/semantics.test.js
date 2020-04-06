/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require("../../ast/parser");
const analyze = require("../analyzer");

const program = String.raw`
fnc batmanSong(times:int):
⇨na = times*13*"na"
hiss(na)
⇦
fnc calculatePERatio(dustockPrice:dub, eps:dub):
⇨return stockPrice/eps
⇦

fangStocks = ["FB", "AAPL", "NFLX", "GOOG"]
fangStocksPrices = [154, 240, 361, 1091]
portfolioPercentage = [0.10, 0.30, 0.50, 0.10]

myPortfolio = tabulate(stocks = fangStocks, prices = fangStocksPrices, percentages = portfolioPercentages)

earningsPerShare = [6.43, 11.91, 4.13, 10.12]

myPortfolio.addColumn(calculatePERatio(myPortfolio.prices, earningsPerShare))

i = 1
for row in myPortfolio:
⇨hiss("Record " + i + ": " + row)
 i += 1
⇦
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

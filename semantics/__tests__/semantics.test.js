/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require("../../ast/parser");
const analyze = require("../analyzer");

// const program = String.raw`
// fnc batmanSong(times:int):
// ⇨na = times*13*"na"
// hiss(na)
// ⇦
// fnc calculatePERatio(stockPrice:dub, eps:dub):
// ⇨return stockPrice/eps
// ⇦

// fangStocks = ["FB", "AAPL", "NFLX", "GOOG"]
// fangStocksPrices = [154, 240, 361, 1091]
// portfolioPercentage = [0.10, 0.30, 0.50, 0.10]

// myPortfolio = tabulate(stocks = fangStocks, prices = fangStocksPrices, percentages = portfolioPercentages)

// earningsPerShare = [6.43, 11.91, 4.13, 10.12]

// myPortfolio.addColumn(calculatePERatio(myPortfolio.prices, earningsPerShare))

// i = 1
// for row in myPortfolio:
// ⇨hiss("Record " + i + ": " + row)
//  i += 1
// ⇦
// `;

// const program = String.raw`
// 2+2
// 5*100/1000-100
// hiss("hello world")
// -100 + 2000

// let a = 10
// let b = 20

// a = 1000*a*b
// let c

// while 1 < 10:
// ⇨hiss("hello world")
// b += 100
// c = 10000
// let d = 1000
// hiss(d)
// ⇦

// `;

const program = String.raw`
fnc batmanSong(times:int, another:str):
⇨let na = times*13
hiss(na)
⇦

batmanSong(100, "brandon")

[1, 2, 3, 4, 5]

`;

// const program = String.raw`

// while 1 < 10:
// ⇨hiss("hello world")
// ⇦

// `;

describe("The semantic analyzer", () => {
    test("accepts the mega program with all syntactic forms", (done) => {
        const astRoot = parse(program);
        expect(astRoot).toBeTruthy();
        analyze(astRoot);
        expect(astRoot).toBeTruthy();
        done();
    });
});

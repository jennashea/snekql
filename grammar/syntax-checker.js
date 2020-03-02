const fs = require('fs');
const ohm = require('ohm-js');
const { withIndentsAndDedents } = require('./preparser');

const grammar = ohm.grammar(fs.readFileSync('grammar/snekql.ohm'));

module.exports = text => {
  try {
    const preparsed = withIndentsAndDedents(text);
    return grammar.match(preparsed).succeeded();
  } catch (e) {
    return false;
  }
};

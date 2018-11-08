#!/usr/bin/env node
'use strict'

const {run, jsy_reducer} = require('./src/index.js')
const usage = `
  Usage
    $ fx-jsy [code ...]

  Combine the excelent \`fx\` utility with JSY syntax.

  Examples
    $ echo '{"key": "value"}' | fx-jsy 'x => x.key'
    value

    $ echo '[1,2,3]' | fx-jsy '.map @ x => x * 2'
    [2, 4, 6]

    $ echo '{"items": ["one", "two"]}' | fx-jsy 'this.items' 'this[1]'
    two

    $ echo '{"items": ["one", "two"]}' | fx-jsy '.items' '[1]'

    $ echo '{"count": 0}' | fx-jsy '@{} ...this, count: 1'
    {"count": 1}
    
    $ echo '{"foo": 1, "bar": 2}' | fx-jsy ?
    ["foo", "bar"]
    
    $ echo '{"key": "value"}' | fx-jsy .key
    value

`


run({
  usage,
  reducer:jsy_reducer,
})

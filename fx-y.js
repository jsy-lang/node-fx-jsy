#!/usr/bin/env node
'use strict'

const {run, jsy_reducer} = require('./src/index.js')
const usage = `
  Usage
    $ fx-y [code ...]

  Combine the excelent \`fx\` utility with JSY syntax.

  Examples
    $ echo '{"key": "value"}' | fx-y 'x => x.key'
    value

    $ echo '[1,2,3]' | fx-y '.map @ x => x * 2'
    [2, 4, 6]

    $ echo '{"items": ["one", "two"]}' | fx-y 'this.items' 'this[1]'
    two

    $ echo '{"items": ["one", "two"]}' | fx-y '.items' '[1]'

    $ echo '{"count": 0}' | fx-y '@{} ...this, count: 1'
    {"count": 1}
    
    $ echo '{"foo": 1, "bar": 2}' | fx-y ?
    ["foo", "bar"]
    
    $ echo '{"key": "value"}' | fx-y .key
    value

`


run({
  usage,
  reducer:jsy_reducer,
})

// Forked under MIT license from https://github.com/antonmedv/fx/blob/961ee629f416ea92ec5eef1e0f04a5984a5d1649/index.js

'use strict'
const pretty = require('@medv/prettyjson')

function main(input, {usage, reducer}) {
  const {stdout, stderr} = process

  if (input === '') {
    stderr.write(usage)
    process.exit(2)
  }

  const json = JSON.parse(input)
  const args = process.argv.slice(2)

  if (args.length === 0 && stdout.isTTY) {
    require('fx/fx')(json)
    return
  }

  const result = args.reduce(reducer, json)

  if (typeof result === 'undefined') {
    stderr.write('undefined\n')
  } else if (typeof result === 'string') {
    console.log(result)
  } else if (stdout.isTTY) {
    console.log(pretty(result))
  } else {
    console.log(JSON.stringify(result, null, 2))
  }
}

function run(options) {
  const stdin = process.stdin
  stdin.setEncoding('utf8')

  let buff = ''

  if (stdin.isTTY) {
    main('', options)
  }

  stdin.on('readable', () => {
    let chunk

    while ((chunk = stdin.read())) {
      buff += chunk
    }
  })

  stdin.on('end', () => {
    main(buff, options)
  })
}

run.run = run
run.main = main
module.exports = exports = run

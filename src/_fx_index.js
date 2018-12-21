// Forked under MIT license from https://github.com/antonmedv/fx/blob/961ee629f416ea92ec5eef1e0f04a5984a5d1649/index.js

'use strict'
const os = require('os')
const fs = require('fs')
const path = require('path')
const {stdin, stdout, stderr} = process
try {
  require(path.join(os.homedir(), '.fxrc'))
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

const print = require('fx/print.js')


function main(input, {usage, reducer}) {
  let args = process.argv.slice(2)
  let filename = 'fx'

  if (input === '') {
    if (args.length === 0) {
      stderr.write(usage)
      process.exit(2)
    }

    input = fs.readFileSync(args[0])
    filename = path.basename(args[0])
    args = args.slice(1)
  }

  const json = JSON.parse(input)

  if (args.length === 0 && stdout.isTTY) {
    require('fx/fx')(filename, json)
    return
  }

  const output = args.reduce(reducer, json)

  if (typeof output === 'undefined') {
    stderr.write('undefined\n')
  } else if (typeof output === 'string') {
    console.log(output)
  } else {
    const [text] = print(output)
    console.log(text)
  }
}

function run(options) {
  stdin.setEncoding('utf8')

  if (stdin.isTTY) {
    main('', options)
    return
  }

  let buff = ''
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

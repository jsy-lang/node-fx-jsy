# `fx-jsy`: `fx` with JSY syntax dialect

 [fx]: https://github.com/antonmedv/fx#readme
 [jsy]: https://jsy-lang.github.io

Combining the excellent [fx][fx] utility from [Anton Medvedev][fx] with [JSY syntax dialect][jsy].

## Documentation

See the [fx documentation][fx] – _all the hard work was done by [Anton Medvedev][fx] anyway!_

## Use

```bash
$ npm install -g fx-jsy
```

```bash
$ echo '[3, 4, 5]' | npx fx-jsy '.map @ x => x ** x'

[
  27,
  256,
  3125
]
```

```bash
$ fx-jsy .dependencies .fx < package.json
^3.0.3
```

A more complex example converting JSON to CSV:

```bash
$ curl https://jsonplaceholder.typicode.com/posts | fx-jsy \
    '[ Object.keys(this[0]) ].concat @ this.map @ ea => Object.values(ea)' \
    '.map @ ea => ea.map @ val => JSON.stringify(val)' \
    '.map @ ea => ea.join @ `,`' \
    '.join @ `\n`' \
    > test.csv
```

## License

MIT


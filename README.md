# `fx-jsy`: `fx` with JSY syntax dialect

 [fx]: https://github.com/antonmedv/fx#readme
 [jsy]: https://jsy-lang.github.io

Combining the excelent [fx][fx] utility from [Anton Medvedev][fx] with [JSY syntax dialect][jsy].

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

## License

MIT


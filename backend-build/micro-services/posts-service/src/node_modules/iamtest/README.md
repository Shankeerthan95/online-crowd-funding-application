# iamtest
[![Latest Stable Version](https://img.shields.io/npm/v/iamtest.svg)](https://www.npmjs.com/package/iamtest)
[![Build Status](https://img.shields.io/travis/amokrushin/iamtest/master.svg)](https://travis-ci.org/amokrushin/iamtest)
[![Test Coverage](https://img.shields.io/codecov/c/github/amokrushin/iamtest/master.svg)](https://codecov.io/github/amokrushin/iamtest?branch=master)
[![Dependency Status](https://img.shields.io/david/amokrushin/iamtest.svg)](https://david-dm.org/amokrushin/iamtest)
[![License](https://img.shields.io/npm/l/iamtest.svg)](https://raw.githubusercontent.com/amokrushin/iamtest/master/LICENSE.txt)

## Installation
```bash
# with npm
$ npm i iamtest -D

# with yarn
$ yarn add iamtest -D
```

## Optional configuration

`.iamtest.js`

```js
module.exports = {
    rootPath: 'src/tests',
    ignorePath: [],
};
```

## Usage

global
```bash
$ iamtest
```
local
```bash
$ npx iamtest
$ BABEL_ENV=test npx iamtest --babel
```
package.json
```json
{
  "script": {
    "test": "iamtest"
  }
}
```

```bash
Options:
  -r, --reporter  test reporter
        [choices: "dots", "spec", "summary", "tape", "silent"] [default: "dots"]
  -c, --coverage  coverage reporter
        [choices: "console", "html", "json", "json-summary", "lcov", "lcovonly",
                                            "text", "text-lcov", "text-summary"]
  --web           web server for coverage report                        [number]
  -w, --watch     watch for changes                                    [boolean]
  --child         child process                                        [boolean]
  --verbose       debug log                                            [boolean]
  --coverageDir   see nyc --report-dir                                  [string]
  --babel         babel                                                [boolean]
  --flow          flow remove types                                    [boolean]
  -h, --help      Show help                                            [boolean]
```

## Example
package.json
```json
{
  "script": {
    "test": "iamtest",
    "test:unit": "iamtest ./test/unit/*",
    "codecov": "iamtest ./test/unit/* -c lcovonly && codecov"
  }
}
```

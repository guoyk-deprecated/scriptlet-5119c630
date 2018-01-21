# scriptlet

[![Build Status](https://travis-ci.org/yankeguo/scriptlet.svg?branch=master)](https://travis-ci.org/yankeguo/scriptlet)

scriptlet engine for node.js

## What is a Scriptlet?

A **scriptlet** is a piece of JavaScript code that could finish running in finite time.

These kinds of code can be regarded as **scriptlet**

* definition of a object / function / scalar constants
* copy a file to another folder
* connect to redis server and set a value
* fetch a web page and save it to a database

These kinds of code can NOT be regarded as **scriptlet**

* a web server
* a job server

## How to define and run a **scriptlet**

Unlike standard Node.js module, **scriptlet** are defined in `AMD` style.

You can easly run a **scriptlet** via this package.

```javascript
// helper.js
//
// this defines a static object

define({
    log(message) {
        console.log(message)
    }
})

// rm.js
//
// this defines a async function, will be evaluated while running

// 'fs-extra' is a standard node.js module
// './helper' is a relative scriptlet file defined above
// '$in' is a injected value upon running, see 'index.js'
define('fs-extra', '../helper', '$in', async function(fs, helper, $in) {
    helper.log(`unlinking file ${$in}`)
    await fs.unlink($in)
})

// index.js
//
// this runs the scriptlet rm.js with $in injected
const scriptlet = require('scriptlet')
const path = require('path')
async function main() {
    await scriptlet.run(path.join(__dirname, 'rm.js'), {
        // inject the '$in' arguments
        extra: new Map(['$in', process.argv[2]]),
        // use mtime based cache policy
        cache: 'mtime'
    })
}
main()
```

## More

You can build a **scriptlet** based web server with hot-reload support or even build your own Amazon Lambda Service.

## Credits

Copyright (c) 2018 Yanke Guo <guoyk.cn@gmail.com>

This software is released under the MIT License, see https://opensource.org/licenses/MIT
 
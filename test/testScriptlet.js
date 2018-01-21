/**
 * testScriptlet.js
 *
 * Copyright (c) 2018 Yanke Guo <guoyk.cn@gmail.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
const scriptlet = require('../')
const path = require('path')
const assert = require('assert')

function diffHrtime (src, dst) {
  const NS_PER_SEC = 1e9
  return (src[0] - dst[0]) * NS_PER_SEC + (src[1] - dst[1])
}

describe('scriptlet', () => {
  it('should works', async () => {
    const out = await scriptlet.run(path.join(__dirname, 'scripts', 'func1.js'), {
      extra: new Map([['$in', 'in']])
    })
    assert.equal(out.boolean, true)
    assert.equal(out.object.hello, 'world')
    assert.equal(out.string, 'ok')
    assert.equal(out.low, 'low')
    assert.equal(out.in, 'in')
  })
  it('should raise on dependency loops', async () => {
    let err = null
    try {
      await scriptlet.run(path.join(__dirname, 'scripts', 'loops', 'loop1.js'))
    } catch (e) {
      err = e
    }
    assert.equal(err.code, scriptlet.ERR_DEPENDENCY_LOOP)
  })
  it('should raise on dependency missing', async () => {
    let err = null
    try {
      await scriptlet.run(path.join(__dirname, 'scripts', 'bad.js'))
    } catch (e) {
      err = e
    }
    assert.equal(err.code, scriptlet.ERR_DEPENDENCY_MISSING)
  })
  it('should run faster if cached', async () => {
    const start1 = process.hrtime()
    await scriptlet.run(path.join(__dirname, 'scripts', 'cache.js'))
    const diff1 = process.hrtime(start1)
    const start2 = process.hrtime()
    await scriptlet.run(path.join(__dirname, 'scripts', 'cache.js'), {
      cache: 'mtime'
    })
    const diff2 = process.hrtime(start2)
    const start3 = process.hrtime()
    await scriptlet.run(path.join(__dirname, 'scripts', 'cache.js'), {
      cache: true
    })
    const diff3 = process.hrtime(start3)
    assert.equal(diffHrtime(diff1, diff2) > 0, true)
    assert.equal(diffHrtime(diff2, diff3) > 0, true)
  })
  it('should works with builtin $load function', async () => {
    const ret = await scriptlet.run(path.join(__dirname, 'scripts', 'load.js'), {
      extra: new Map([['$input', 'b']])
    })
    assert.equal(ret.val1, 'b')
    assert.equal(ret.val2, 'AA')
  })
})

/**
 * func1.js
 *
 * Copyright (c) 2018 Yanke Guo <guoyk.cn@gmail.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/* global define */
define(['./staticBoolean', './staticObject', './staticString', 'lodash', '$in'], async function (b, o, s, _, $in) {
  return {
    boolean: b,
    object: o,
    string: s,
    low: _.toLower('LOW'),
    in: $in
  }
})

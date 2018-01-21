/**
 * loadTarget.js
 *
 * Copyright (c) 2018 Yanke Guo <guoyk.cn@gmail.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/* global define */
define('$input', 'lodash', function ($input, _) {
  return _.toUpper($input + $input)
})

/**
 * Created by guangqiang on 2017/9/18.
 */

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }}

var _validator = require('./validatorMiddleware')

var _validator2 = _interopRequireDefault(_validator)

var defaultOptions = {
  key: 'meta'
}

exports['default'] = function () {
  let options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0]
  return (0, _validator2['default'])(options)
}

module.exports = exports['default']
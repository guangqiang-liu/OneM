/**
 * Created by guangqiang on 2017/9/18.
 */

'use strict'
import {Toast} from '../../utils/toast'

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var _lodashClonedeep = require('../../../node_modules/lodash._basecopy');

var _lodashClonedeep = require('./deepClone');

var _lodashClonedeep2 = _interopRequireDefault(_lodashClonedeep);

exports['default'] = function (options) {

  var validatorMiddleware = function validatorMiddleware(store) {

    return function (next) {

      return function (action) {

        if (!action[options.key] || !action[options.key].validator) {
          return next(action);
        }

        // nextPayload
        var nextAction = undefined;

        var nextPayload = undefined;

        try {
          nextPayload = action.payload.nextPayload;
        } catch (e) {

        }

        if (nextPayload !== undefined) {
          nextAction = (0, _lodashClonedeep2['default'])(action);
          nextAction.payload = nextPayload;
        }

        // -----------

        var flag = true;

        var errorParam = undefined, errorId = undefined, errorMsg = undefined;

        var validators = action[options.key].validator || {};

        var runValidator = function runValidator(param, func, msg, id, key) {
          var flag = undefined;

          if (func) {
            flag = func(param, store.getState(), action.payload);
          } else {
            throw new Error('validator func is needed');
          }

          if (typeof flag !== 'boolean') {
            throw new Error('validator func must return boolean type');
          }

          if (!flag) {
            errorParam = key;
            errorId = id;
            errorMsg = msg || '';
          }
          return flag;
        };

        var runValidatorContainer = function runValidatorContainer(validator, param, key) {
          var flag = undefined;

          if (Array.prototype.isPrototypeOf(validator)) {
            for (var j in validator) {
              var item = validator[j];
              flag = runValidator(param, item.func, item.msg, j, key);
              if (!flag) break;
            }
          } else {
            flag = runValidator(param, validator.func, validator.msg, 0, key);
          }
          return flag;
        };


        if (typeof action.payload === 'object') {
          for (var i in validators) {
            var validator = validators[i];
            if (action.payload[i]) {
              flag = runValidatorContainer(validator, action.payload[i], i);
              if (!flag)break;
            }
          }
        }

        // payload
        var payloadValidator = validators.payload;
        if (payloadValidator) {
          flag = runValidatorContainer(payloadValidator, action.payload, 'payload');
        }

        // -------

        // default
        var defaultValidator = validators['default'];
        if (defaultValidator) {
          flag = runValidatorContainer(defaultValidator, undefined, 'default');
        }

        // -------

        if (flag) {
          action = nextAction || action;
          if (typeof action.payload.promise === 'function') {
            action = {
              ...action,
              payload: {
                ...action.payload,
                promise: action.payload.promise(),
              },
            }
          }
          return next(action);
        } else {
          Toast.showWarning(errorMsg)
          return {
            err: 'validator',
            msg: errorMsg,
            param: errorParam,
            id: errorId,
          };
        }
      };
    };
  };

  return validatorMiddleware;
};

module.exports = exports['default'];
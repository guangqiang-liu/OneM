/**
 * Created by guangqiang on 2017/11/23.
 */
import {Toast, deepClone} from '../utils'
export default validatorMiddleware = extraArgument => {

  return ({getState, dispatch}) => next => action => {

    // console.log('action:', action)

    let actionObj = action || {}
    let payloadObj = actionObj.payload
    let metaObj = action.meta || {}
    let validatorObj = metaObj.validator || {}

    if (!metaObj.validator) {
      return next(action)
    }

    let nextAction = undefined
    let nextPayload = undefined

    try {
      nextPayload = action.payload.nextPayload
    } catch (e) {
      return next(action)
    }

    if (nextPayload !== undefined) {
      nextAction = deepClone(action)
      nextAction.payload = nextPayload
    }

    if (metaObj && (typeof nextPayload.promise === 'function') && validatorObj) {

      if (Array.prototype.isPrototypeOf(validatorObj.data) && validatorObj.data.length > 0) {

        let paramsArr = validatorObj.data || []
        let func = null
        let msg = ''
        let isPassed = true
        let params = payloadObj.params || {}
        for (let i = 0; i < paramsArr.length; i ++) {

          let item = paramsArr[i]
          func = item.func
          msg = item.msg

          if(typeof func === 'function') {
            if (typeof func(params, getState(), payloadObj) !== 'boolean') {
              throw new Error('validator func must return boolean type')
            } else {
              if (!func(params, getState(), payloadObj)) {
                Toast.showWarning(msg)
                isPassed = false
                return {
                  err: 'validator',
                  msg: msg,
                  params: params,
                  id: i,
                }
              } else {
                continue
              }
            }
          } else {
            throw new Error('validator func is needed')
          }
        }

        if (isPassed) {
          action = nextAction || action
          if (typeof action.payload.promise === 'function') {
            let promise = action.payload.promise()
            action = {
              ...action,
              payload: {
                ...action.payload,
                promise: promise,
              }
            }
          }
          return next(action)
        }
      }
    }
  }
}
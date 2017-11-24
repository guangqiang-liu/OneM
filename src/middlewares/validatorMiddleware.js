/**
 * Created by guangqiang on 2017/11/23.
 */
import {Toast, deepClone} from '../utils'
export default validatorMiddleware = extraArgument => {

  return ({getState, dispatch}) => next => action => {

    console.log('action:', action)

    let actionObj = action || {}
    let payloadObj = actionObj.payload
    let metaObj = action.meta || {}
    let validatorObj = metaObj.validator || {}

    // 非参数校验器，直接跳过
    if (!metaObj.validator) {
      return next(action)
    }

    // nextPayload
    let nextAction = undefined
    let nextPayload = undefined

    try {
      nextPayload = action.payload.nextPayload
    } catch (e) {
      throw new Error('validator nextPayload is needed')
    }

    if (nextPayload !== undefined) {
      nextAction = deepClone(action)
      nextAction.payload = nextPayload
    }

    if (metaObj && (typeof nextPayload.promise === 'function') && validatorObj) {

      // 参数校验
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
              if (!func(params, getState(), payloadObj)) { // false
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

        // 是否可以执行下一个aciton
        if (isPassed) {
          action = nextAction || action
          if (typeof action.payload.promise === 'function') {
            action = {
              ...action,
              payload: {
                ...action.payload,
                promise: action.payload.promise(),
              }
            }
          }
          return next(action)
        }
      }
    }
  }
}
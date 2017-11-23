/**
 * Created by guangqiang on 2017/11/23.
 */
import {Toast} from '../utils'
export default validatorMiddleware = extraArgument => {

  return ({getState, dispatch}) => next => action => {

    console.log('action:', action)

    let actionObj = action || {}
    let payloadObj = actionObj.payload
    let metaObj = action.meta || {}
    let validatorObj = metaObj.validator || {}

    if (metaObj && (payloadObj instanceof Promise) && validatorObj) {
      console.log('payloadObj:', payloadObj)
      console.log('metaObj:', metaObj)
      console.log('validatorObj:', validatorObj)

      if (Array.prototype.isPrototypeOf(validatorObj.data) && validatorObj.data.length > 0) {
        let paramsArr = validatorObj.data || []
        let func = null
        let msg = ''

        for (let i = 0; i < paramsArr.length; i ++) {
          let item = paramsArr[i]
          func = item.func
          msg = item.msg

          if(typeof func === 'function') {
            if (typeof func(item, getState(), payloadObj) !== 'boolean') {
              throw new Error('validator func must return boolean type')
            } else {
              if (!func(item, getState(), payloadObj)) {
                Toast.showWarning(msg)
                return {
                  err: 'validator',
                  msg: msg,
                  param: item,
                }
              } else {
                continue
              }
            }
          } else {
            throw new Error('validator func is needed')
          }
        }
      }
    }
    return next(action)
  }
}
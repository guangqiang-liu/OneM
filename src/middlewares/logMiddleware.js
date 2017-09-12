/**
 * Created by guangqiang on 2017/8/31.
 */
import {sendSystemLog} from '../utils/venilog/systemLog'
import type from '../constants/actionType'
export default venilogMiddleware = () => {
  return ({getState, dispatch}) => next => action => {
    if (typeof action.payload === 'object' && action.payload.params) {
      if (action.type === type.REACT_NATIVE_ROUTER_FLUX_FOCUS) {
        sendSystemLog(action)
      } else if (action.type === type.REACT_NATIVE_ROUTER_FLUX_BACK) {
        sendSystemLog(action)
      }
    }
    next(action)
  }
}
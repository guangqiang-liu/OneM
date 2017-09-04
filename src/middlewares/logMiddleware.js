/**
 * Created by guangqiang on 2017/8/31.
 */

/** 日志打点中间件 **/
import {sendSystemLog} from '../utils/venilog/systemLog'

export default venilogMiddleware = () => {
  return ({getState, dispatch}) => next => action => {
    if (action.scene) {
      // 在这里做相应的 action的判断处理
      sendSystemLog(action)
    }
    next(action)
  }
}

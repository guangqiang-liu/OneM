/**
 * Created by guangqiang on 2017/8/29.
 */
export default loggerMiddleware = () => {
  return ({getState, dispatch}) => next => action => {
    // console.log('before dispatch state:', getState())
    // console.log('action:', action)
    next(action)
    // console.log('after dispatch state:', getState())
  }
}
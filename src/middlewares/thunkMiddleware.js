/**
 * Created by guangqiang on 2017/8/29.
 */
export default thunkMiddleware = extraArgument => {
  return ({getState, dispatch}) => next => action => {
    if (typeof action === 'function') {
      return action(getState, dispatch, extraArgument)
    }
    return next(action)
  }
}
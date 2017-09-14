/**
 * Created by guangqiang on 2017/9/11.
 */
import store from '../../store'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
const dispatch = state => action => {
  console.log('Action: ', action)
  let state = store.getState()
  let dispatchAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT)
  let clearAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT_CLEAR)
  let popAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_BACK)
  let pushAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_FOCUS)
  store.dispatch(dispatchAction(action))
  // eventUnit:一个完整event单元
  let eventUnit = state.common.router.eventUnit
  if (eventUnit.length <= 3) {
    if (eventUnit.length === 3) {
      let firstType = eventUnit[0].type // 用来区分是不是 pop
      let blurRouterName = eventUnit[1].routeName
      let focusType = eventUnit[2].type
      let focusRouterName = eventUnit[2].routeName // focusName
      if (focusRouterName !== 'loading') { // 忽略 HUD
        if (firstType === type.REACT_NATIVE_ROUTER_FLUX_BACK && blurRouterName !== 'loading') { // POP
          store.dispatch(popAction(action))
        } else if (focusType === type.REACT_NATIVE_ROUTER_FLUX_FOCUS && blurRouterName !== 'loading') { // PUSH
          store.dispatch(pushAction(action))
        }
      }
      store.dispatch(clearAction(action))
    }
  } else {
    // 清空eventUnit数组的对象
    store.dispatch(clearAction(action))
  }
}

export {dispatch}
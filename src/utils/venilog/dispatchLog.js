/**
 * Created by guangqiang on 2017/9/11.
 */
import store from '../../store'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
const dispatch = state => action => {
  let state = store.getState()
  let eventAdd = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT)
  let eventClear = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT_CLEAR)
  let eventPop = createAction(type.REACT_NATIVE_ROUTER_FLUX_BACK)
  let eventPush = createAction(type.REACT_NATIVE_ROUTER_FLUX_FOCUS)
  store.dispatch(eventAdd(action))
  // console.log('Action: ',action)
  let eventArr = state.common.router.eventUnit
  if (eventArr.length <= 3) {
    if (eventArr.length === 3) { // 当eventUtil数组数量满足三个，才是一个完整的event
      let firstType = eventArr[0].type
      let blurName = eventArr[1].routeName
      let focusType = eventArr[2].type
      let focusName = eventArr[2].routeName // focusName
      if (focusName !== 'loading') { // 忽略 HUD
        if (firstType === type.REACT_NATIVE_ROUTER_FLUX_BACK && blurName !== 'loading') { // POP
          store.dispatch(eventPop(action))
        } else if (focusType === type.REACT_NATIVE_ROUTER_FLUX_FOCUS && blurName !== 'loading') { // PUSH
          store.dispatch(eventPush(action))
        }
      }
      store.dispatch(eventClear(action))
    }
  } else {
    // 清空event数组的对象
    store.dispatch(eventClear(action))
  }
}

export {dispatch}
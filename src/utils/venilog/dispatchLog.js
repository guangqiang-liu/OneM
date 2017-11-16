/**
 * Created by guangqiang on 2017/9/11.
 */
import store from '../../store'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'

const dispatch = state => action => {
  let state = store.getState()
  let dispatchAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT)
  let clearAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_EVENT_CLEAR)
  let popAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_BACK)
  let pushAction = createAction(type.REACT_NATIVE_ROUTER_FLUX_FOCUS)
  store.dispatch(dispatchAction(action))
  let eventUnit = state.common.router.eventUnit
  if (eventUnit.length <= 3) {
    if (eventUnit.length === 3) {
      let firstType = eventUnit[0].type
      let blurRouterName = eventUnit[1].routeName
      let focusType = eventUnit[2].type
      let focusRouterName = eventUnit[2].routeName
      if (focusRouterName !== 'loading') {
        if (firstType === type.REACT_NATIVE_ROUTER_FLUX_BACK && blurRouterName !== 'loading') {
          store.dispatch(popAction(action))
        } else if (focusType === type.REACT_NATIVE_ROUTER_FLUX_FOCUS && blurRouterName !== 'loading') {
          store.dispatch(pushAction(action))
        }
      }
      store.dispatch(clearAction(action))
    }
  } else {
    store.dispatch(clearAction(action))
  }
}

export {dispatch}
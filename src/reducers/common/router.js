/**
 * Created by guangqiang on 2017/9/11.
 */
import type from '../../constants/actionType'
import {ActionConst} from 'react-native-router-flux'
import {handleActions} from 'redux-actions'

const initialState = {
  scene: 'init',
  // 自定义导航栈
  routerStack: [],
  eventUnit: []
}

const Actions= {}

Actions[ActionConst.FOCUS] = (state, action) => { // PUSH
  return {
    ...state,
    routerStack: [...state.routerStack, action.payload.routeName],
    eventUnit: []
  }
}

Actions[type.REACT_NATIVE_ROUTER_FLUX_BACK] = (state, action) => { // POP
  state.routerStack.pop()
  return {
    ...state,
    routerStack: [...state.routerStack],
    eventUnit: []
  }
}

Actions[type.REACT_NATIVE_ROUTER_FLUX_EVENT] = (state, action) => {
  if (action.payload.type) {
    state.eventUnit.push({type: action.payload.type, routeName: action.payload.routeName ? action.payload.routeName : 'back', params: action.payload.params})
    return {
      ...state,
      eventUnit: state.eventUnit
    }
  }
}

Actions[type.REACT_NATIVE_ROUTER_FLUX_EVENT_CLEAR] = (state, action) => {
  if (state.eventUnit.length === 3) {
    return {
      ...state,
      eventUnit: []
    }
  } else {
    return state
  }
}

const reducer = handleActions(Actions, initialState)

export default reducer
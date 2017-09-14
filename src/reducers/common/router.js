/**
 * Created by guangqiang on 2017/9/11.
 */
import type from '../../constants/actionType'
import {ActionConst} from 'react-native-router-flux'
import {handleActions} from 'redux-actions'
import {ArrayTool} from '../../utils/arrayExtension'
const initialState = {
  scene: 'init',
  // 自定义导航栈
  routerStack: [],
  eventUnit: []
}

const Actions= {}

Actions[type.REACT_NATIVE_ROUTER_FLUX_EVENT] = (state, action) => {
  if (action.payload.type) {
    return {
      ...state,
      eventUnit: ArrayTool.push(state.eventUnit, {type: action.payload.type, routeName: action.payload.routeName ? action.payload.routeName : 'back', params: action.payload.params})
    }
  }
}

Actions[ActionConst.FOCUS] = (state, action) => { // PUSH
  return {
    ...state,
    routerStack: [action.payload.routeName, ...state.routerStack], // 入栈
    eventUnit: []
  }
}

Actions[type.REACT_NATIVE_ROUTER_FLUX_BACK] = (state, action) => { // POP
  return {
    ...state,
    routerStack: [...ArrayTool.shift(state.routerStack)],
    eventUnit: []
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
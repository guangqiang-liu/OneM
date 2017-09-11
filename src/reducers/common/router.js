/**
 * Created by guangqiang on 2017/9/11.
 */
import type from '../../constants/actionType'
import {ActionConst} from 'react-native-router-flux'
import {handleActions} from 'redux-actions'

const initialState = {
  scene: 'init',
  sceneStack: 'init'
}

const Actions= {}

initialState[ActionConst.PUSH] = (state, action) => {
  if (action.key !== 'loading') {
    return {
      ...state,
      sceneStack: [...state.sceneStack, action.key]
    }
  } else {
    return state
  }
}

const reducer = handleActions(Actions, initialState)

export default reducer
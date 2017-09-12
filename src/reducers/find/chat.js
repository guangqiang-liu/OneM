/**
 * Created by guangqiang on 2017/8/22.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  xxx: 'chat',
  num: 0
}

const originalReducers = {}

originalReducers[type.OPEN_CHAT + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    num: action.payload.nextPublishTime
  }
}

originalReducers[type.CHAT_INCREASES + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  num: state.num + 1
})

originalReducers[type.CHAT_REDUCE + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  num: state.num - 1
})

const reducer = handleActions(originalReducers, initialState)

export default reducer
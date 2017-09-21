/**
 * Created by guangqiang on 2017/9/18.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'

const initialState = {
  questionDetail: {}
}

const actions = {}

actions[type.READING_QUESTION_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  questionDetail: action.payload.data
})

const reducer = handleActions(actions, initialState)

export default reducer
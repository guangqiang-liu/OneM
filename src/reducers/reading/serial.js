/**
 * Created by guangqiang on 2017/9/18.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'

const initialState = {
  serialDetail: {}
}

const actions = {}

actions[type.READING_SERIAL_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  serialDetail: action.payload.data
})

const reducer = handleActions(actions, initialState)

export default reducer
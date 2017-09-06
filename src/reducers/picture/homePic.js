/**
 * Created by guangqiang on 2017/9/4.
 */

import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  picList: [],
  picDetailData: {}
}

const originalReducers = {}

originalReducers[type.PICTURE_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  picList: action.payload.data
})

originalReducers[type.PICTURE_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  picDetailData: action.payload.data
})

const reducer = handleActions(originalReducers, initialState)

export default reducer
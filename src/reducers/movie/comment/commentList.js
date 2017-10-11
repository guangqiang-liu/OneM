/**
 * Created by guangqiang on 2017/10/10.
 */
import type from '../../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  miniCommenData: [],
  plusCommetData: [],
  miniTotalCount: 0,
  plusTotalCount: 0,
}

const originalReducers = {}

originalReducers[type.MOVIE_MINI_COMMENT + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    miniCommenData: action.payload.data.cts,
    miniTotalCount: action.payload.data.totalCount
  }
}

originalReducers[type.MOVIE_PLUS_COMMENT + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    plusCommetData: action.payload.comments,
    plusTotalCount: action.payload.totalCount
  }
}

const reducer = handleActions(originalReducers, initialState)

export default reducer
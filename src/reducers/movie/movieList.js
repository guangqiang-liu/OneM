/**
 * Created by guangqiang on 2017/9/6.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  showTimeList: [],
  comeingNewList: [],
  attentionList: []
}

const originalReducers = {}

originalReducers[type.MOVIE_SHOWTIME_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    showTimeList: action.payload.ms
  }
}

originalReducers[type.MOVIE_COMEING_NEW_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    comeingNewList: action.payload.moviecomings,
    attentionList: action.payload.attention
  }
}

const reducer = handleActions(originalReducers, initialState)

export default reducer
/**
 * Created by guangqiang on 2017/9/6.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  showTimeList: [],
  comeingNewList: []
}

const originalReducers = {}

originalReducers[type.MOVIE_SHOWTIME_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  showTimeList: []
})

originalReducers[type.MOVIE_COMEING_NEW_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  comeingNewList: []
})

const reducer = handleActions(originalReducers, initialState)

export default reducer
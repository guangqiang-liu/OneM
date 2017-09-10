/**
 * Created by guangqiang on 2017/9/6.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  movieList: [],
  showHUD: false
}

const originalReducers = {}

originalReducers[type.MOVIE_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  movieList: action.payload.data
})

originalReducers[type.FETCH_SHOW_HUD] = (state, action) => {
  return {
    ...state,
    showHUD: action.payload.isShow
  }
}

const reducer = handleActions(originalReducers, initialState)

export default reducer
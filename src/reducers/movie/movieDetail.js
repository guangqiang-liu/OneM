/**
 * Created by guangqiang on 2017/10/9.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  movieDetail: {},
  commentData: {}
}

const actions = {}

actions[type.MOVIE_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    movieDetail: action.payload.data
  }
}

actions[type.MOVIE_COMMENT_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    commentData: action.payload.data
  }
}

const reducer = handleActions(actions, initialState)

export default reducer
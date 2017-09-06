/**
 * Created by guangqiang on 2017/9/6.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/movie'

const getMovieList = createAction(type.MOVIE_LIST, actions.movieList)
const getMovieDetail = createAction(type.MOVIE_DETAIL, actions.movieDetail)
const getMovieStory = createAction(type.MOVIE_STORY, actions.movieStory)

const actionCreators = {
  getMovieList,
  getMovieDetail,
  getMovieStory
}

export default {actionCreators}
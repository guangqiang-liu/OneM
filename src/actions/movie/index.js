/**
 * Created by guangqiang on 2017/9/6.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/movie'

// 表单校验器
// const getMovieList = createAction(type.MOVIE_LIST, actions.movieList, actions.testValidator)
const getMovieList = createAction(type.MOVIE_LIST, actions.movieList)
const getMovieListForDemo = createAction(type.MOVIE_LIST, actions.movieListForDemo)
const getMovieDetail = createAction(type.MOVIE_DETAIL, actions.movieDetail)
const getMovieStory = createAction(type.MOVIE_STORY, actions.movieStory)

const actionCreators = {
  getMovieList: (params) => getMovieList(params),
  getMovieDetail,
  getMovieStory,
  getMovieListForDemo
}

export default {actionCreators}
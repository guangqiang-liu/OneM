/**
 * Created by guangqiang on 2017/9/6.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/movie'

const getMovieList = createAction(type.MOVIE_LIST, actions.movieList)
const getMovieListForDemo = createAction(type.MOVIE_LIST, actions.movieListForDemo)
const getMovieDetail = createAction(type.MOVIE_DETAIL, actions.movieDetail)
const getMovieStory = createAction(type.MOVIE_STORY, actions.movieStory)
const getMovieShowTimeList = createAction(type.MOVIE_SHOWTIME_LIST, actions.movieShowTimeList)
const getMovieComeingNewList = createAction(type.MOVIE_COMEING_NEW_LIST, actions.movieComeingNewList)
const getMovieComment = createAction(type.MOVIE_COMMENT_LIST, actions.movieCommentList)
const getMiniComment = createAction(type.MOVIE_MINI_COMMENT, actions.movieMiniCommentList)
const getPlusComment = createAction(type.MOVIE_PLUS_COMMENT, actions.moviePlusCommentList)
const getTrailerList = createAction(type.MOVIE_TRAILER_LIST, actions.movieTrailerList)
const getActorList = createAction(type.MOVIE_ACTOR_LIST, actions.movieActorList)
const getPictureList = createAction(type.MOVIE_PICTURE_LIST, actions.moviePictureList)

const actionCreators = {
  getMovieList: params => getMovieList(params),
  getMovieDetail,
  getMovieStory,
  getMovieListForDemo,
  getMovieShowTimeList,
  getMovieComeingNewList,
  getMovieComment,
  getMiniComment,
  getPlusComment,
  getTrailerList,
  getActorList,
  getPictureList,
}

export default {actionCreators}
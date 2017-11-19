/**
 * Created by guangqiang on 2017/9/5.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {Required, ValidateUtil} from '../../utils/validatorUtil'
import {ApiSource} from '../../constants/commonType'

const movieStory = params => getFetch(`/movie/${params}/story/1/0`, params)
const movieList = params =>  getFetch(`${PATH.MOVIE_LIST}${params}`, {})
const movieShowTimeList = params =>  getFetch(PATH.MOVIE_SHOWTIME, params, ApiSource.TIMEMOVIE)
const movieComeingNewList = params =>  getFetch(PATH.MOVIE_COMEING_NEW, params, ApiSource.TIMEMOVIE)
const movieDetail = params => getFetch(PATH.MOVIE_DETAIL, params, ApiSource.TIMETICKET)
const movieCommentList = params => getFetch(PATH.MOVIE_COMMENT_LIST, params, ApiSource.TIMETICKET)
const movieMiniCommentList = params => getFetch(PATH.MOVIE_MINI_COMMENT_LIST, params, ApiSource.TIMEMOVIE)
const moviePlusCommentList = params => getFetch(PATH.MOVIE_PLUS_COMMENT_LIST, params, ApiSource.TIMEMOVIE)
const movieTrailerList = params => getFetch(PATH.MOVIE_TRAILER_LIST, params, ApiSource.TIMEMOVIE)
const movieActorList = params => getFetch(PATH.MOVIE_ACTOR_LIST, params, ApiSource.TIMEMOVIE)
const moviePictureList = params => getFetch(PATH.MOVIE_PICTURE_LIST, params, ApiSource.TIMEMOVIE)

const loginValidator = (params) => {
  return {
    validator: {
      params: ValidateUtil([
        {
          func: (data, state, payload) => {
            return Required(params.name)
          },
          msg: '请输入用户名'
        },
        {
          func: (data, state, payload) => {
            return Required(params.pwd)
          },
          msg: '请输入密码'
        },
      ])
    }
  }
}

const movieListForDemo = (pageId = 1, callback, options, params) =>  {
  return getFetch(
    `${PATH.MOVIE_LIST}${params}`,
    {},
    (response) => {
      if (response.res === 0) {
        callback && callback(response.data)
      } else {
        if (response.data && response.data.length === 0) {
          callback && callback([])
        } else {
          callback && callback(response.data, {allLoaded: true})
        }
      }
      return {...response, pageId}
    }
  )
}

export default {
  movieList,
  movieDetail,
  movieStory,
  movieListForDemo,
  loginValidator,
  movieShowTimeList,
  movieComeingNewList,
  movieCommentList,
  movieMiniCommentList,
  moviePlusCommentList,
  movieTrailerList,
  movieActorList,
  moviePictureList
}
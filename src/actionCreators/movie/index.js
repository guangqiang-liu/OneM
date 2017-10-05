/**
 * Created by guangqiang on 2017/9/5.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {Required, ValidateUtil} from '../../utils/validatorUtil'
import {ApiSource} from '../../constants/commonType'
const movieDetail = params => getFetch(`${PATH.MOVIE_DETAIL}${params}`, params)
const movieStory = params => getFetch(`/movie/${params}/story/1/0`, params)
const movieList = params =>  getFetch(`${PATH.MOVIE_LIST}${params}`, {})
const movieShowTimeList = params =>  getFetch(PATH.MOVIE_SHOWTIME, params, ApiSource.TIMEMOVIE)
const movieComeingNewList = params =>  getFetch(PATH.MOVIE_COMEING_NEW, params, ApiSource.TIMEMOVIE)

// 参数校验器
const testValidator = () => ({
  validator: {
    data: ValidateUtil([
      {
      func: (data, state, payload) => {
        return Required(data.mobile)
      }, msg: '请输入手机号'
      },
      {
      func: (data, state, payload) => Required(data.code), msg: '请输入验证码',
      },
    ])
  }
})

// 加载List列表的Action写法
const movieListForDemo = (pageId = 1, callback, options, params) =>  {
  return getFetch(
    `${PATH.MOVIE_LIST}${params}`,
    {},
    (response) => {
      if (response.res === 0) { // 有更多
        callback && callback(response.data)
      } else { // 没有更多
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
  testValidator,
  movieShowTimeList,
  movieComeingNewList
}
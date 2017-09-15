/**
 * Created by guangqiang on 2017/9/5.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'

const movieDetail = params => getFetch(`${PATH.MOVIE_DETAIL}${params}`, params)
const movieStory = params => getFetch(`/movie/${params}/story/1/0`, params)
const movieList = params =>  getFetch(`${PATH.MOVIE_LIST}${params}`, {})

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
  movieListForDemo
}
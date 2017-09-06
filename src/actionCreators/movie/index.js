/**
 * Created by guangqiang on 2017/9/5.
 */

import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'

movieList = (id, params) => getFetch(`${PATH.MOVIE_LIST}${id}`, params)

export default {
  movieList
}
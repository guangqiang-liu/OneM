/**
 * Created by guangqiang on 2017/9/10.
 */
import {PATH} from '../../constants/urls'
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
const readingBannerList = params => getFetch(PATH.READING_BANNER, params)
const readingArticleList = params => getFetch(PATH.READING_ARTICLE_LIST, params)
export default {
  readingBannerList,
  readingArticleList
}
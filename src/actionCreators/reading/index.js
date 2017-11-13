/**
 * Created by guangqiang on 2017/9/10.
 */
import {PATH} from '../../constants/urls'
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
const readingBannerList = params => getFetch(PATH.READING_BANNER, params)
const readingBannerDetail = params => getFetch(`${PATH.READING_BANNER_CONTENT}${params}`, {})
const readingArticleList = params => getFetch(PATH.READING_ARTICLE_LIST, params)
const readingEssayDetail = params => getFetch(`${PATH.READING_ESSAY_DETAIL}${params}`, {})
const readingSerialDetail = params => getFetch(`${PATH.READING_SERIAL_DETAIL}${params}`, {})
const readingQuestionDetail = params => getFetch(`${PATH.READING_QUESTION_DETAIL}${params}`, {})
const readingCommentList = params => getFetch(`${PATH.READING_COMMENT_LIST}${params.type}/${params.id}/${params.index}`, {})
const readingArticleCateList = params => getFetch(`/${params.type}${PATH.READING_ARTICLE_CATE_LIST}${params.year}-${params.month}`, {})

// 加载List列表的Action写法
// const readingCommentList = (pageId = 1, callback, options, params) =>  {
//   return getFetch(
//     `${PATH.READING_COMMENT_LIST}${params.type}/${params.id}/${params.index}`,
//     {},
//     (response) => {
//       if (response.res === 0) { // 有更多
//         callback && callback(response.data)
//       } else { // 没有更多
//         if (response.data && response.data.length === 0) {
//           callback && callback([])
//         } else {
//           callback && callback(response.data, {allLoaded: true})
//         }
//       }
//       return {...response, pageId}
//     }
//   )
// }

export default {
  readingBannerList,
  readingArticleList,
  readingBannerDetail,
  readingEssayDetail,
  readingSerialDetail,
  readingQuestionDetail,
  readingCommentList,
  readingArticleCateList
}
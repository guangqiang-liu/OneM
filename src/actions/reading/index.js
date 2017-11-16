/**
 * Created by guangqiang on 2017/9/10.
 */
import action from '../../actionCreators/reading'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
const getReadingBannerList = createAction(type.READING_BANNER_LIST, action.readingBannerList)
const getBannerDetail = createAction(type.READING_BANNER_ARTICLE, action.readingBannerDetail)
const getEssayDetail = createAction(type.READING_ESSAY_DETAIL, action.readingEssayDetail)
const getSearilDetail = createAction(type.READING_SERIAL_DETAIL, action.readingSerialDetail)
const getQuestionDetail = createAction(type.READING_QUESTION_DETAIL, action.readingQuestionDetail)
const getReadingCommentList = createAction(type.READING_COMMENT_LIST, action.readingCommentList)
const getArticleCateList = createAction(type.READING_ARTICLE_CATE_LIST, action.readingArticleCateList)
const getReadingArticleList = createAction(type.READING_ARTICLE__LIST, action.readingArticleList)

const actionCreators = {
  getReadingBannerList,
  getBannerDetail,
  getEssayDetail,
  getSearilDetail,
  getQuestionDetail,
  getReadingCommentList,
  getArticleCateList,
  getReadingArticleList
}

export default {actionCreators}
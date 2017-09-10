/**
 * Created by guangqiang on 2017/9/10.
 */
import action from '../../actionCreators/reading'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
const getReadingBannerList = createAction(type.READING_BANNER_LIST, action.readingBannerList)

const actionCreators = {
  getReadingBannerList
}

export default {actionCreators}
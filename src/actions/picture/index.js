/**
 * Created by guangqiang on 2017/9/4.
 */

import { createAction } from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/picture'

const getPicList = createAction('xxxx', actions.picList)
const getPicDetail = createAction(type.PICTURE_DETAIL, actions.picDetail)
const getPastList = createAction(type.PICTURE_PAST_LIST, actions.pastList)

const actionCreators = {
  getPicList,
  getPicDetail,
  getPastList
}

export default {actionCreators}
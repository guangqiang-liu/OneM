/**
 * Created by guangqiang on 2017/10/11.
 */
import type from '../../../constants/actionType'
import {handleActions} from 'redux-actions'

const defaultState = {
  pictureArr: [],
  pictureType: []
}

const handlers = {}

handlers[type.MOVIE_PICTURE_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, aciton) => ({
  ...state,
  pictureArr: aciton.payload.images,
  pictureType: aciton.payload.imageTypes
})

const reducer = handleActions(handlers, defaultState)

export default reducer
/**
 * Created by guangqiang on 2017/9/7.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'

const initState = {
  musicIdList: [],
  musicDetail: {}
}

const originReducer = {}

originReducer[type.MUSIC_ID_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  musicIdList: action.payload.data
})

originReducer[type.MUSIC_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  musicDetail: action.payload.data
})

const reducer = handleActions(originReducer, initState)

export default reducer
/**
 * Created by guangqiang on 2017/9/7.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'

const initState = {
  musicIdList: [],
  musicDetail: {},
  musicInfo: {},
  musicList: [],
  playerListId: []
}

const originReducer = {}

originReducer[type.MUSIC_ID_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  musicIdList: action.payload.data
})

originReducer[type.MUSIC_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  musicDetail: action.payload.data,
  // 往播放列表中插入一条数据
  musicList: new Array(action.payload.data)
})

originReducer[type.MUSIC_XIAMI_MUSIC + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    musicInfo: action.payload,
    // playerListId: action.payload.map((item) => item.music_id)
  }
}

originReducer[type.MUSIC_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
  ...state,
  musicList: state.musicList.concat(action.payload.data)
})

originReducer[type.MUSIC_RESET_MUSIC_INFO] = (state, action) => ({
  ...state,
  musicInfo: {}
})

const reducer = handleActions(originReducer, initState)

export default reducer
/**
 * Created by guangqiang on 2017/9/7.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
musicIdList = params => getFetch(PATH.MUSIC_ID_LIST, params)
musicDetail = params => getFetch(`${PATH.MUSIC_DETAIL}${params}`, params)
musicList = params => getFetch(PATH.MUSIC_ID_LIST, params)

export default {
  musicIdList,
  musicDetail,
  musicList
}
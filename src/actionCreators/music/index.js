/**
 * Created by guangqiang on 2017/9/7.
 */
import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
musicIdList = params => getFetch(PATH.MUSIC_ID_LIST, params)
musicDetail = params => getFetch(`${PATH.MUSIC_DETAIL}${params}`, params)
musicList = (year, month, params) => getFetch(`${PATH.MUSIC_LIST}${year}-${month}`, params)
xiamiMusic = params => getFetch(`${PATH.MUSIC_XIAMI_MUSIC}${params}`, 0)

formatTime = (duration) => {
  let min = Math.floor(duration / 60)
  let second = duration - min * 60
  min = min >= 10 ? min : '0' + min
  second = second >= 10 ? second : '0' + second
  return min + ':' + second
}

export default {
  musicIdList,
  musicDetail,
  musicList,
  xiamiMusic,
  formatTime
}
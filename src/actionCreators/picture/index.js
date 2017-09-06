/**
 * Created by guangqiang on 2017/9/4.
 */

import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'

const picList = (params) => getFetch(PATH.PICTURE_LIST, params)

const picDetail = params =>  getFetch(`${PATH.PICTURE_DETAIL}${params}`, params)

const pastList = params => {
  let dateList = []
  let date = new Date()
  let currentMonth = date.getMonth()
  let currentYear = date.getFullYear()
  for (let year = currentYear, month = currentMonth;;) {
    dateList.push([year, month])
    if (month === 0) {
      if (year < params.beginYear + 1) {
        break
      }
      month = 11
      year = year - 1
    } else {
      month = month - 1
    }
    if (year < params.beginYear + 1 && month < params.beginMonth) {
      break
    }
  }
  return dateList
}

picGridList = (year, month, params) => getFetch(`${PATH.PICTURE_GRID_LIST}${year}-${month}`, params)

export default {
  picList,
  picDetail,
  pastList,
  picGridList
}
/**
 * Created by guangqiang on 2017/8/31.
 */
import {LogRequest} from '../network/venilog'
import {PATH} from '../../constants/urls'
import {defaultValue} from './logParams'
import {VENILOG_URL} from '../../constants/urlConfig'
import type from '../../constants/actionType'
import pageJson from '../../assets/data/venilog.json'
import {Toast} from '../toast'
import store from '../../store'

const sendLog = () => {
  LogRequest.post(VENILOG_URL + PATH.VENILOG, Object.assign(defaultValue, {}))
    .catch((error) => {
      console.log('打点失败', error)
    })
    .then((response) => {
      console.log('打点成功', response)
    })
}

/**
 * 在这里处理是页面打点
 * @param action
 */
const sendSystemLog = action => {
  // console.log('Action: ', action)
  let pageId = ''
  let pageIdData = pageJson
  let routeName = action.payload.params.routeName
  if (action.type === type.REACT_NATIVE_ROUTER_FLUX_FOCUS) {
    pageId = pageIdData[routeName] ? pageIdData[routeName].pageId : ''
    if (!pageId) {
      // Toast.show(`进入 ${routeName}: 没有找到对应的pageId`)
      return
    }
    // Toast.show(`进入页面：${routeName}:${pageId} -> 打点成功！`)
  } else if (action.type === type.REACT_NATIVE_ROUTER_FLUX_BACK) {
    let stackArr = store.getState().common.router.routerStack
    let pageName = stackArr[0]
    pageId = pageName ? pageIdData[pageName].pageId : ''
    if (!pageId) {
      // Toast.show(`${'dada'}: 没有找到对应的pageId`)
      return
    }
    // Toast.show(`退出页面：${pageName}:${pageId} -> 打点成功！`)
  }
  if (pageId) {
    // sendLog(pageId)
  }
}

export {sendSystemLog}
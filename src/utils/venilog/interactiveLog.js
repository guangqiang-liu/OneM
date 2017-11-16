/**
 * Created by guangqiang on 2017/8/31.
 */
import {LogRequest} from '../network/venilog'
import {PATH} from '../../constants/urls'
import {defaultValue} from './logParams'
import {VENILOG_URL} from '../../constants/urlConfig'
import {Toast} from '../../utils/toast'
const sendInteractiveLog = (id, eventId, params) => {
  // 打点日志信息
  // let currentPage = store.getState().route.scene
  // let message = venilogJson[currentPage] && venilogJson[currentPage][id]
  // let pageId = venilogJson[currentPage] && venilogJson[currentPage].pageId
  // let { entry } = options
  // Toast.show('交互埋点!')
  LogRequest.post(VENILOG_URL + PATH.VENILOG, {})
    .then((response) => {
      if (response !== null) {
        if (response.success) {
          console.log('打点成功')
          // Toast.show('打点成功!')
        } else {
          console.log('打点失败')
        }
      } else {
        console.log('服务失败')
      }
    }).catch(err => {
    // Toast.show('打点成功!')
  })
}

export {sendInteractiveLog}
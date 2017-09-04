/**
 * Created by guangqiang on 2017/8/31.
 */

import {LogRequest} from '../network/venilog'
import {PATH} from '../../constants/urls'
import {defaultValue} from './defaultLogParams'
import {VENILOG_URL} from '../../constants/urlConfig'

const sendLog = () => {
  LogRequest.post(VENILOG_URL + PATH.VENILOG, Object.assign(defaultValue, {}))
    .then((response) => response.json())
    .catch((error) => {
      console.log('打点失败', error)
    })
    .then((response) => {
      console.log('打点成功', response)
    })
}

const sendSystemLog = (action) => {
  // 做相应的系统打点判断处理
  sendLog()
}

export {sendSystemLog}

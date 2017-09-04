/**
 * Created by guangqiang on 2017/8/26.
 */

/**
 * chat 模块对应的 actionCreator
 */

var getUrl = "http://baobab.kaiyanapp.com/api/v4/tabs/selected"
var postUrl = "https://api.douban.com/v2/book/1220562"

import {getFetch, postFetch} from '../../utils/network/request/HttpExtension'

const chatList = (params) => {
  let temp = getFetch(getUrl, params)
  return temp
}

// 等价上面的写法
const chatFriend = (params) => postFetch(postUrl, params)

export default {
  chatList,
  chatFriend
}
/**
 * Created by guangqiang on 2017/8/26.
 */

/**
 * 网络请求工具类的拓展类，便于后期网络层修改维护
 */

import HttpUtils from './HttpUtils'

/**
 * GET 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetch = (url, params, callback) => {

  let promise = HttpUtils.getRequest(url, params)

  if (callback && typeof callback === 'function') {
    promise.then((response) => {
      return callback(response)
    })
  }
  return promise
}

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const postFetch = (url, params, callback) => {

  let promise = HttpUtils.postRequrst(url, params)

  if (callback && typeof callback === 'function') {
    promise.then((response) => {
      return callback(response)
    })
  }
  return promise
}

export {getFetch, postFetch}

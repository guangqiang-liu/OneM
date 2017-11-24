/**
 * Created by guangqiang on 2017/8/26.
 */

/** 网络请求工具类的拓展类，便于后期网络层修改维护 **/

import HttpUtils from './HttpUtils'
import {API_URL, MIAMI_URL, TIME_MOVIE_URL, TIME_TICKET_URL} from '../../../constants/urlConfig'
import {ApiSource} from '../../../constants/commonType'
import {dataCache} from '../cache'

/**
 * GET \ POST
 * 从缓存中读取数据
 * @param isCache 是否缓存
 * @param requestType 网络请求类型
 * @param url 请求url
 * @param params 请求参数
 * @param source API资源
 * @param callback 是否有回调函数
 * @returns {value \ promise}
 * 返回的值如果从缓存中取到数据就直接换行数据，或则返回promise对象
 */
const fetchData = (isCache, requestType) => (url, params, source, callback) => {

  switch (source) {
    case ApiSource.MIAMIMUSIC:
      url = `${MIAMI_URL}${url}`
      break
    case ApiSource.TIMEMOVIE:
      url = `${TIME_MOVIE_URL}${url}`
      break
    case ApiSource.TIMETICKET:
      url = `${TIME_TICKET_URL}${url}`
      break
    default:
      url = `${API_URL}${url}`
      break
  }

  const fetchFunc = () => {
    let promise = requestType === 'GET' ? HttpUtils.getRequest(url, params) : HttpUtils.postRequrst(url, params)
    if (callback && typeof callback === 'function') {
      promise.then(response => {
        return callback(response)
      })
    }
    return promise
  }

  return dataCache(url, fetchFunc, isCache)
}

/**
 * GET 请求
 * @param url
 * @param params
 * @param source
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetch = fetchData(false, 'GET')

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const postFetch = fetchData(false, 'POST')

/**
 * GET 请求，带缓存策略
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetchFromCache = fetchData(true, 'GET')

const postFetchForValidator = (url, params) => {
  let promise
  promise = () => {
    return fetchData(false, 'GET')(url, {})
  }
  return {
    data: params,
    params,
    nextPayload: {
      promise: promise
    }
  }
}

export {getFetch, postFetch, getFetchFromCache, postFetchForValidator}
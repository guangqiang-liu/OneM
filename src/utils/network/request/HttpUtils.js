/**
 * Created by guangqiang on 2017/8/26.
 */

/** 基于fetch 封装的网络请求工具类 **/

import {Component} from 'react'
import responseType from '../../../constants/responseType'
import {Toast} from '../../toast'
import {RootHUD} from '../../progressHUD'

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
  if (params) {
    let paramsArray = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
    if (url.search(/\?/) === -1) {
      typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url
}

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch, timeout = 30000) => {
  let timeoutBlock = () => {}
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject('timeout promise')
    }
  })

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  let abortable_promise = Promise.race([
    original_fetch,
    timeout_promise
  ])

  setTimeout(() => {
      timeoutBlock()
    },
    timeout)

  return abortable_promise
}

export default class HttpUtils extends Component {
  /**
   * 基于fetch 封装的GET 网络请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static getRequest = (url, params = {}) => {
    RootHUD.show()
    return timeoutFetch(fetch(handleUrl(url)(params), {
      method: 'GET',
      headers: header
    }))
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          Toast.show('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((response) => {
        RootHUD.hidden()
        // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
        if (response && response.res === responseType.RESPONSE_SUCCESS) {
          return response
        } else {
          // 非 200，错误处理
          // alert(response.message)
          return response
        }
      })
      .catch((error) => {
        RootHUD.hidden()
        Toast.show(error)
      })
  }

  /**
   * 基于fetch 的 POST 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequrst = (url, params = {}) => {
    RootHUD.show()
    return timeoutFetch(fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(params)
    }))
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          Toast.show('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((response) => {
        RootHUD.hidden()
        if (response && response.res === responseType.RESPONSE_SUCCESS) {
          return response
        } else {
          // 非 200，错误处理
          // alert(response.message)
          return response
        }
      })
      .catch((error) => {
        RootHUD.hidden()
        Toast.show(error)
      })
  }
}
/**
 * Created by guangqiang on 2017/8/30.
 */

/** 全局URL DOMAIN 环境配置 **/

const domain = {
  dev: {
    API_URL: 'https://api.douban.com',
    MSITE_URL: 'https://api.douban.com',
    VENILOG_URL: 'https://api.douban.com'
  },
  alpha: {
    API_URL: 'http://api.xxx.com',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  qa: {
    API_URL: 'http://api.xxx.com',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  pre: {
    API_URL: 'http://api.xxx.com',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  prd: {
    API_URL: 'http://api.xxx.com',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  }
}

let ENV = 'dev'
let currentDomain = domain[ENV]

const setDomain = (env = 'dev') => {
  ENV = env
  currentDomain = domain[ENV]
}

const API_URL = currentDomain.API_URL
const MSITE_URL = currentDomain.MSITE_URL
const VENILOG_URL = currentDomain.VENILOG_URL

export {ENV, API_URL, MSITE_URL, VENILOG_URL, setDomain}

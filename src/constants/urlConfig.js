/**
 * Created by guangqiang on 2017/8/30.
 */
const host = {
  dev: {
    API_URL: 'https://api.douban.com',
    XIAMI_URL: 'http://xiamirun.avosapps.com',
    TIME_MOVIE_URL: 'https://api-m.mtime.cn',
    TIME_TICKET_URL: 'https://ticket-api-m.mtime.cn',
    MSITE_URL: 'https://api.douban.com',
    VENILOG_URL: 'https://api.douban.com'
  },
  alpha: {
    API_URL: 'http://api.xxx.com',
    XIAMI_URL: 'http://xiamirun.avosapps.com',
    TIME_MOVIE_URL: 'https://api-m.mtime.cn',
    TIME_TICKET_URL: 'https://ticket-api-m.mtime.cn',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  qa: {
    API_URL: 'http://api.xxx.com',
    XIAMI_URL: 'http://xiamirun.avosapps.com',
    TIME_MOVIE_URL: 'https://api-m.mtime.cn',
    TIME_TICKET_URL: 'https://ticket-api-m.mtime.cn',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  pre: {
    API_URL: 'http://api.xxx.com',
    XIAMI_URL: 'http://xiamirun.avosapps.com',
    TIME_MOVIE_URL: 'https://api-m.mtime.cn',
    TIME_TICKET_URL: 'https://ticket-api-m.mtime.cn',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  },
  prd: {
    API_URL: 'http://v3.wufazhuce.com:8000/api',
    XIAMI_URL: 'http://xiamirun.avosapps.com',
    TIME_MOVIE_URL: 'https://api-m.mtime.cn',
    TIME_TICKET_URL: 'https://ticket-api-m.mtime.cn',
    MSITE_URL: 'http://m.xxx.com',
    VENILOG_URL: 'http://venilog.xxx.com'
  }
}

let ENV = 'prd'
let currentHost = host[ENV]

const setHost = (env = 'dev') => {
  ENV = env
  currentHost = host[ENV]
}

const API_URL = currentHost.API_URL
const MSITE_URL = currentHost.MSITE_URL
const VENILOG_URL = currentHost.VENILOG_URL
const MIAMI_URL = currentHost.XIAMI_URL
const TIME_MOVIE_URL = currentHost.TIME_MOVIE_URL
const TIME_TICKET_URL = currentHost.TIME_TICKET_URL
export {ENV, API_URL, MSITE_URL, VENILOG_URL, MIAMI_URL, TIME_MOVIE_URL, TIME_TICKET_URL, setHost}
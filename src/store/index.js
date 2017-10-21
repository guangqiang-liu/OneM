/**
 * Created by guangqiang on 2017/8/21.
 */
import {createStore, applyMiddleware} from 'redux'
import AppReducers from '../reducers'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import customThunk from '../middlewares/thunkMiddleware'
import loggerMiddleware from '../middlewares/loggerMiddleware'
import venilogMiddleware from '../middlewares/logMiddleware'
import Validator from '../middlewares/validator'
const middlewares = [
  thunkMiddleware,
  customThunk(),
  Validator(),
  promiseMiddleware({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}),
  loggerMiddleware(),
  venilogMiddleware(),
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(AppReducers)

export default store

/**
 * 创建store 需要注意点：
 * 1、这里的reducer 不再需要使用 combineReducers() 函数处理
 * 2、promiseMiddleware 这个中间件必须是函数， promiseMiddleware()
 * promiseMiddleware()函数内的中需要包含promiseTypeSuffixes属性
 */
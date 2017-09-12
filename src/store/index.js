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

const middlewares = [
  thunkMiddleware,
  customThunk(),
  promiseMiddleware({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}),
  loggerMiddleware(),
  venilogMiddleware(),
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(AppReducers)

/**
 * 创建store 需要注意点：
 * 1、这里的reducer 不能再使用 combineReducers() 函数处理
 * 2、promiseMiddleware 这个中间件必须是函数， promiseMiddleware()
 */
//  创建store需要注意，这里有坑，可能导致dispatch() 派发action失败,
// 这里的分发失败是因为 promiseMiddleware 这个中间件必须是函数， promiseMiddleware()

export default store
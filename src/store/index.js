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
import validator from '../middlewares/validatorMiddleware'

const middlewares = [
  validator(),
  thunkMiddleware,
  customThunk(),
  promiseMiddleware({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}),
  loggerMiddleware(),
  venilogMiddleware(),
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(AppReducers)

export default store
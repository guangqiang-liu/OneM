/**
 * Created by guangqiang on 2017/8/21.
 */
import { combineReducers } from 'redux'
import launch from './init'
import home from './home'
import find from './find'

// 所有模块的reducer集合
const rootReducer = combineReducers({
  launch,
  home,
  find
})

export default rootReducer

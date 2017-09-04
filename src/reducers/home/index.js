/**
 * Created by guangqiang on 2017/8/22.
 */
import {combineReducers} from 'redux'

import custom from './custom'

// home 模块的reducer
const homeReducer = combineReducers({
  custom
})

export default homeReducer

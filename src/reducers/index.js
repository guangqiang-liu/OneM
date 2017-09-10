/**
 * Created by guangqiang on 2017/8/21.
 */
import { combineReducers } from 'redux'
import launch from './init'
import home from './home'
import find from './find'

import picture from './picture'
import movie from './movie'
import music from './music'
import reading from './reading'
import loading from './common'
const rootReducer = combineReducers({
  launch,
  home,
  find,
  picture,
  movie,
  music,
  reading,
  loading
})

export default rootReducer
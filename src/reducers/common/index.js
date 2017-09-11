/**
 * Created by guangqiang on 2017/9/10.
 */
import {combineReducers} from 'redux'
import loading from './loading'
import router from './router'
const reducer = combineReducers({
  loading,
  router
})

export default reducer
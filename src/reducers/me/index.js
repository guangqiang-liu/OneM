/**
 * Created by guangqiang on 2017/10/12.
 */
import {combineReducers} from 'redux'
import me from './me'
import login from '../login'
import register from '../register'
const reducers = combineReducers({
  me,
  login,
  register
})

export default reducers

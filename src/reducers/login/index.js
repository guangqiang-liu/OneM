/**
 * Created by guangqiang on 2017/11/14.
 */
import {handleActions} from 'redux-actions'

const defaultState = {}
const handlers = {}

const reducer = handleActions(handlers, defaultState)

export default reducer
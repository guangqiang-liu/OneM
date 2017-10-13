/**
 * Created by guangqiang on 2017/10/12.
 */
import {handleActions} from 'redux-actions'

const defaultState = {}
const handlers = {}

const reducer = handleActions(handlers, defaultState)

export default reducer
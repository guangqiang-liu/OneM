/**
 * Created by guangqiang on 2017/11/14.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import ActionCreator from '../../actionCreators/me'

const mockRegister = createAction(type.MOVIE_LIST, ActionCreator.register, ActionCreator.registerValidator)

const actionCreators = {
  mockRegister
}

export default {actionCreators}
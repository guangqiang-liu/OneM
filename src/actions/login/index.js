/**
 * Created by guangqiang on 2017/11/14.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import ActionCreator from '../../actionCreators/me'

const mockLogin = createAction(type.MOVIE_LIST, ActionCreator.login, ActionCreator.loginValidator)

const actionCreators = {
  mockLogin
}

export default {actionCreators}
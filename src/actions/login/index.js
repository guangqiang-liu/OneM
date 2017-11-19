/**
 * Created by guangqiang on 2017/11/14.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import tempAction from '../../actionCreators/movie'

const mockLogin = createAction(type.MOVIE_LIST, tempAction.movieList, tempAction.loginValidator)

const actionCreators = {
  mockLogin
}

export default {actionCreators}
/**
 * Created by guangqiang on 2017/9/10.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'
const initState = {
  showHUD: false
}

const originalReducer = {}

originalReducer[type.FETCH_SHOW_HUD] = (state, action) => {
  return {
    ...state,
    showHUD: action.payload.isShow
  }
}

const reducer = handleActions(originalReducer, initState)

export default reducer
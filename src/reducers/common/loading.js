/**
 * Created by guangqiang on 2017/9/10.
 */
import {handleActions} from 'redux-actions'
import type from '../../constants/actionType'
const initialState = {
  showHUD: false
}

const Actions = {}

Actions[type.FETCH_SHOW_HUD] = (state, action) => {
  if (state.showHUD !== action.payload) {
    return {
      ...state,
      showHUD: action.payload
    }
  } else {
    return {
      ...state
    }
  }
}

const reducer = handleActions(Actions, initialState)

export default reducer
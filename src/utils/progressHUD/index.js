/**
 * Created by guangqiang on 2017/9/10.
 */
import React from 'react'
import ProgressHUD from './progressHUD'
import store from '../../store'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
import {Actions} from 'react-native-router-flux'

const loadingAction = createAction(type.FETCH_SHOW_HUD)

let sibling = undefined

const ShowProgress = {
  show: () => {
    sibling = new RootSiblings(<ProgressHUD />)
  },
  hidden: ()=> {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }
}

const RootHUD = {
  show: () => {
    let currentStatus = store.getState().common.loading.showHUD
    if (!currentStatus) {
      Actions.loading()
      store.dispatch(loadingAction(true))
    }
  },
  hidden: () => {
    store.dispatch(loadingAction(false))
  }
}

export {RootHUD}
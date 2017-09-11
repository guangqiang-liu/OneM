/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import RootSiblings from 'react-native-root-siblings'
import ProgressHUD from './progressHUD'
import store from '../../store'
import type from '../../constants/actionType'
import {createAction} from 'redux-actions'
import {Actions} from 'react-native-router-flux'

const loadingAction = createAction(type.FETCH_SHOW_HUD)
let sibling = null

/**
 * 借助三方库，在 app 最顶层添加视图，但是有bug
 */
export class ShowProgress {
  show() {
    sibling = new RootSiblings(<ProgressHUD />)
  }
  hidden() {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }
}

export default showHUD = params => {
  let currentStatus = store.getState().common.loading.showHUD
  if (params && !currentStatus) { // 需要显示
    Actions.loading()
    store.dispatch(loadingAction(params))
  } else { // 不需要显示
    store.dispatch(loadingAction(params))
  }
}
/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import RootSiblings from 'react-native-root-siblings'
import ProgressHUD from './progressHUD'
let sibling = null
export default class ShowProgress {
  show() {
    sibling = new RootSiblings(<ProgressHUD />)
  }
  hidden() {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }
}
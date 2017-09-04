/**
 * Created by guangqiang on 2017/8/22.
 */
import {bindActionCreators}  from 'redux'
import openChat from './find/chat'
import launch from './init/launchAction'

const action = {
  openChat,
  launch
}

// 绑定UI组件上的函数到props上，当想绑定多个UI组件上的函数到props上时，还未做处理（name参数传递过来数组）
const dispatch = name => dispatch => {
  return bindActionCreators(action[name].actionCreators, dispatch)
}

export default {dispatch}
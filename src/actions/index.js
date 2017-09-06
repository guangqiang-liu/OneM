/**
 * Created by guangqiang on 2017/8/22.
 */
import {bindActionCreators}  from 'redux'
import openChat from './find/chat'
import launch from './init/launchAction'
import picture from './picture'
import movie from './movie'

const action = {
  openChat,
  launch,
  picture,
  movie
}

const dispatch = name => dispatch => {
  return bindActionCreators(action[name].actionCreators, dispatch)
}

export default {dispatch}
/**
 * Created by guangqiang on 2017/8/22.
 */
import {bindActionCreators}  from 'redux'
import openChat from './find/chat'
import launch from './init/launchAction'
import picture from './picture'
import movie from './movie'
import music from './music'
import reading from './reading'
import me from './me'
import login from './login'
import register from './register'

const action = {
  openChat,
  launch,
  picture,
  movie,
  music,
  reading,
  me,
  login,
  register
}

const dispatch = name => dispatch => {
  if (Array.isArray(name)) {
    let tempActionCreators = {}
    for (let i = 0; i < name.length; i++) {
      Object.assign(tempActionCreators, action[name[i]].actionCreators)
    }
    return bindActionCreators(tempActionCreators, dispatch)
  } else {
    return bindActionCreators(action[name].actionCreators, dispatch)
  }
}

export default {dispatch}
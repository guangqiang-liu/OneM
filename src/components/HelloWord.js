/**
 * Created by guangqiang on 2017/8/16.
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Actions} from "react-native-router-flux"

import {Button} from './common'
import {TouchableOpacity} from './common/touchable/touchableOpacity'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import type from '../constants/actionType'
import {getFetch, postFetch} from '../utils/network/request/HttpExtension'

var getUrl = "http://baobab.kaiyanapp.com/api/v4/tabs/selected"
var postUrl = "https://api.douban.com/v2/book/1220562"

var tempFunc = () => {
  return (store) => next => action => {
    console.log(store, next, action,)
  }
}

tempFunc()

class HelloWord extends Component {

  // get() {
  //   getFetch(getUrl).then((data) => {
  //     console.log(data)
  //   })
  // }
  //
  // post() {
  //   postFetch(postUrl).then((data) => {
  //     alert(data)
  //   })
  // }

  redux() {
    // 这里地方通过redux 框架，可以拿到网络请求数据
    let temp = this.props.openChat({xxx: 'ooo'})
    console.log(temp)
    temp.then((data) => {
      console.log(data)
    })
  }

  click(data) {
    alert(data)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>HelloWold</Text>
        <Button onPress={() => this.props.testFunc('xxx')}>测试是不是每一个自定义的func都可以拿到对应的 dispatch 和 getStore</Button>
        <Button onPress={() => Actions.home()}>home</Button>
        <Text>{'通过redux获取到的state上的数据'+this.props.xxx}</Text>
        <Button onPress={() => this.props.increase()}>加</Button>
        <Button onPress={() => this.props.reduce()}>减</Button>
        <Text style={{fontSize: 30, color: 'orange'}}>{this.props.num}</Text>
        <Text style={{fontSize: 30, color: 'orange'}}>{this.props.ppp}</Text>
        <Button onPress={() => this.get()}>发送GET请求</Button>
        <Button onPress={() => this.post()}>发送POST请求</Button>
        <Button onPress={() => this.redux()}>redux 派发dispatch</Button>
        <TouchableOpacity
          vID='TEST_HOOK'
          onPress={() => this.click('papapa')}
          style={{backgroundColor: 'green', width: 100, height: 100}}
        >
          <Text style={{color: 'red'}}> HOOK 点击事件 </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


// 将绑定操作在UI组件上完成, 是另一种redux 写法
// const testFunc = (data) => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: type.CHAT_INCREASES,
//     })
//   }
// }
//
// const mapStateToProps = (state, props) => {
//   return {
//     ppp: '嗷嗷嗷'
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     testFunc: bindActionCreators(testFunc, dispatch),
//   }
// }
//
// export default HelloWord = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(HelloWord)
export default HelloWord

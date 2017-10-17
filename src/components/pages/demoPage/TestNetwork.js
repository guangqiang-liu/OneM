/**
 * Created by guangqiang on 2017/8/16.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Button} from './../../common'
import HttpUtils from '../../../utils/network/request/HttpUtils'

const getUrl = "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290"
const postUrl = "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290"

class Network extends Component {

  get() {
   HttpUtils.getRequest(getUrl, {}).then(response => {
     alert(response)
   })
  }

  post() {
    HttpUtils.getRequest(getUrl, {}).then(response => {
      alert(response)
    })
  }

  reduxForFetch() {
    // 这里地方通过redux 框架，可以拿到网络请求数据
    this.props.openChat({movieId: 208325}).then(response => {
      alert(response)
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>测试网络请求框框</Text>
        <Text>{'通过redux获取到的state上的数据'+this.props.xxx}</Text>
        <Button onPress={() => this.get()}>发送GET请求</Button>
        <Button onPress={() => this.post()}>发送POST请求</Button>
        <Button onPress={() => this.reduxForFetch()}>redux 派发dispatch</Button>
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
// export default _Network = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Network)

export default Network
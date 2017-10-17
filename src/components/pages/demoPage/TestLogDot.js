/**
 * Created by guangqiang on 2017/10/13.
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {commonStyle} from '../../../utils'
import {TouchableOpacity} from '../../../components/common'
export default class TestLogDot extends Component {

  log() {
    console.log('log')
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 50, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
        <TouchableOpacity
          vID='testLog'
          onPress={() => this.log()}>
          <Text>测试用户交互触发数据埋点</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
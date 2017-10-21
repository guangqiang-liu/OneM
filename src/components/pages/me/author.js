/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import {Actions} from 'react-native-router-flux'
export default class Author extends BaseComponent {

  navigationBarProps() {
    return {
      title: '作者技术博客',
      subTitle: '欢迎同学们star'
    }
  }

  _render() {
    return (
      <View style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
        <TouchableOpacity
          onPress={() => Actions.webView({uri: 'https://github.com/guangqiang-liu/OneM', title: 'GitHub'})}>
          <Text>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Actions.webView({uri: 'http://www.jianshu.com/u/023338566ca5', title: '简书'})}>
          <Text>简书</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CSDN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>掘金</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>开发者头条</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CocoaChina</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>cnblogs</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>SegmentFault</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
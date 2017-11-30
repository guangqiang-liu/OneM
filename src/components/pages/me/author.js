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
      subTitle: '欢迎同学们关注作者简书，也请给OneM 一个 star 谢谢'
    }
  }

  _render() {
    return (
      <View style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
        <TouchableOpacity
          style={{marginVertical: 5}}
          onPress={() => Actions.webView({uri: 'https://github.com/guangqiang-liu/OneM', title: 'GitHub'})}>
          <Text>作者GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 5}}
          onPress={() => Actions.webView({uri: 'http://www.jianshu.com/u/023338566ca5', title: '简书'})}>
          <Text>作者简书</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>CSDN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>掘金</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>开发者头条</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>CocoaChina</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>cnblogs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>SegmentFault</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text>RN技术交流群：620792950</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
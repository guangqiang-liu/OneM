/**
 * Created by guangqiang on 2017/11/26.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text} from 'react-native'
import {commonStyle} from '../../../utils'
import {BaseComponent} from '../../base/baseComponent'

export default class UserInfo extends BaseComponent {

  constructor(props) {
    super(props)
    this.testObj = {
      mobile: 232323,
      name: 'zhangsan',
      sex: 20,
      wechat: 2232
    }
  }

  navigationBarProps() {
    return {
      title: '用户信息',
      rightTitle: '提交',
      rightTitleStyle: {
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#161C28',
        borderBottomWidth: 0
      },
      titleStyle: {
        color: commonStyle.white
      }
    }
  }

  onRightPress() {
    console.log('click')
  }

  _render() {
    return (
      <View style={styles.container}>
        <Text>用户信息待完成</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  }
})
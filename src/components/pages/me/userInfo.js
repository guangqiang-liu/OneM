/**
 * Created by guangqiang on 2017/11/26.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {commonStyle} from '../../../utils'
import {Form} from '../../common'
import {fields} from './userInfoFields'
import {BaseComponent} from '../../base/baseComponent'

const MForm = Form.form

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
      rightTitle: '提交'
    }
  }

  onRightPress() {
    alert('提交')
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MForm
            key='form'
            value={this.testObj}
            fields={fields}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.bgColor
  }
})

/**
 * Created by guangqiang on 2017/11/26.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text} from 'react-native'
import {commonStyle} from '../../../utils'
import {Form} from '../../common'
import {fields} from '../../common/form/fields/userInfoFields'
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
      title: 'Form',
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
    let value = this.refs.form.getValue()
    console.log(value)
  }

  renderView1() {
    return (
      <View style={{height: 49, alignItems: 'flex-end', justifyContent: commonStyle.center, flex: 1, marginRight: 15}}>
        <Text>这里是自定义View1</Text>
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MForm
            ref={'form'}
            value={this.testObj}
            fields={fields}
            renderView1={this.renderView1()}
            loadFeeType={(callback) => callback([{ id: 0, name: '包邮' }, { id: 1, name: '到付'}])}
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
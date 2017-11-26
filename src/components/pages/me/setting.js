/**
 * Created by guangqiang on 2017/11/16.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle, Icon, deviceInfo, storage} from '../../../utils'
import {Actions} from 'react-native-router-flux'

export default class Setting extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  navigationBarProps() {
    return {
      title: '设置',
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      titleStyle: {
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#161C28',
        borderBottomWidth: 0,
      }
    }
  }

  renderItem(title) {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={{flex: 1}}>{title}</Text>
        <Icon name={`oneIcon|push_arror_o`} size={20} color={'#B1B1B1'}/>
      </TouchableOpacity>
    )
  }

  renderSettingPanel() {
    return (
      <View style={{backgroundColor: commonStyle.white, alignItems: commonStyle.center, marginTop: 10}}>
        {this.renderItem('免打扰时间')}
        {this.renderItem('通知管理')}
        {this.renderItem('海报屏蔽')}
        {this.renderItem('商城使用帮助')}
        {this.renderItem('喜欢我们去打分')}
        {this.renderItem('清除缓存')}
      </View>
    )
  }

  logoutClick() {
    storage.remove('userInfo')
    this.props.callback && this.props.callback()
    Actions.pop()
  }

  renderBtn() {
    return (
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => this.logoutClick()}
      >
        <Text style={{fontSize: 15, color: commonStyle.white}}>退出登录</Text>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderSettingPanel()}
          {this.renderBtn()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.bgColor
  },
  item: {
    paddingHorizontal: 10,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    paddingVertical: 10,
    justifyContent: commonStyle.between,
    borderBottomColor: commonStyle.lineColor,
    borderBottomWidth: commonStyle.lineWidth
  },
  logoutBtn: {
    marginHorizontal: 10,
    width: deviceInfo.deviceWidth - 20,
    paddingVertical: 10,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    backgroundColor: '#E13C3E',
    borderRadius: 20,
    marginTop: 20
  }
})
/**
 * Created by guangqiang on 2017/8/27.
 */

/**
 * component 基类
 */

import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import NavigationBar from '../common/navigationBar'
import {commonStyle} from '../../utils/commonStyle'
import {Actions} from "react-native-router-flux"
class BaseComponent extends Component {

  constructor(props) {
    super(props)
    // 获取导航栏属性
    this.navigationBarProps = this.navigationBarProps.bind(this)
    // 绘制主体内容
    this._render = this._render.bind(this)
    // 导航左按钮点击事件
    this.onLeftPress = this.onLeftPress.bind(this)
    // 导航右按钮点击事件
    this.onRightPress = this.onRightPress.bind(this)
  }

  /**
   * 此函数主要用来提供给子类向父类传递导航属性
   * @returns {null}
   */
  navigationBarProps() {
    return null
  }

  /**
   * 导航返回左按钮点击事件，子类可以overload，当子类没有重载，默认pop当前vc
   */
  onLeftPress() {
    Actions.pop()
  }

  /**
   * 导航右按钮点击事件，需要子类overload
   */
  onRightPress() {}

  /**
   * 绘制导航栏
   * 不需要子类overload
   * @returns {XML}
   */
  renderNavigationBar() {
    let navigationBarProps = this.navigationBarProps()
    Object.assign(navigationBarProps, this.props)
    return (
      <NavigationBar
        navigationBarProps={navigationBarProps}
        onLeftPress={this.onLeftPress}
        onRightPress={this.onRightPress}
      />
    )
  }

  /**
   * 绘制UI组件主体View，子类必须overload
   * @returns {null}
   */
  _render() {
    return null
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderNavigationBar()}
        {this._render()}
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

export {BaseComponent}
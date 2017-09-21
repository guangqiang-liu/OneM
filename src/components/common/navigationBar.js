/**
 * Created by guangqiang on 2017/8/27.
 */

/**
 * 通用导航栏组件
 */
import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native'
import {commonStyle} from '../../utils/commonStyle'

const defaultNavigationBarProps = {
  hiddenNav: false,
  hiddenLeftItem: false,
  hiddenRightItem: false,
}

export default class NavigationBar extends Component {

  constructor(props) {
    super(props)
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps)
  }

  componentWillReceiveProps(nextProps) {
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, nextProps.navigationBarProps)
  }

  renderLeftItem() {
    if (this.navigationBarProps.hiddenLeftItem) {
      return null
    }
    const {onLeftPress} = this.props
    let tempComponent
    if (this.navigationBarProps.leftButtonImage) {
      tempComponent = (
        <Image
          style={[styles.leftImageStyle, this.navigationBarProps.leftImageStyle]}
          resizeMode="contain"
          source={this.navigationBarProps.leftButtonImage}
        />
      )
    } else if (this.navigationBarProps.leftTitle && this.navigationBarProps.leftTitle !== '') {
      tempComponent = (
        <Text style={[styles.leftTitleStyle, this.navigationBarProps.leftTitleStyle]}>{this.navigationBarProps.leftTitle}</Text>
      )
    } else {
      tempComponent = (
        <Image
          style={[styles.leftImageStyle, this.navigationBarProps.leftImageStyle]}
          resizeMode="contain"
          source={require('../../assets/images/return.png')}
        />
      )
    }
    return (
      <TouchableOpacity
        style={[styles.leftItemStyle, this.navigationBarProps.leftItemStyle]}
        onPress={onLeftPress}>
        {tempComponent}
      </TouchableOpacity>
    )
  }

  renderTitle() {
    return (
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleStyle, this.navigationBarProps.titleStyle]}>{this.navigationBarProps.title}</Text>
      </View>
    )
  }

  renderRightItem() {
    if (this.navigationBarProps.hiddenRightItem) {
      return null
    }
    const {onRightPress} = this.props
    let tempComponent
    if (this.navigationBarProps.rightButtonImage) {
      tempComponent = (
        <Image
          style={[styles.rightImageStyle, this.navigationBarProps.rightImageStyle]}
          resizeMode="contain"
          source={this.navigationBarProps.rightButtonImage}
        />
      )
    } else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
      tempComponent = (
        <Text style={[styles.rightTitleStyle, this.navigationBarProps.rightTitleStyle]}>{this.navigationBarProps.rightTitle}</Text>
      )
    } else {
      return null
    }
    return (
      <TouchableOpacity
        style={[styles.rightItemStyle, this.navigationBarProps.rightItemStyle]}
        onPress={onRightPress}>
        {tempComponent}
      </TouchableOpacity>
    )
  }

  render() {
    if (this.navigationBarProps.hiddenNav) {
      return null
    }
    return (
      <View style={[styles.navBarStyle, this.navigationBarProps.navBarStyle]}>
        <View style={[styles.navContentStyle, this.navigationBarProps.navContentStyle]}>
          {/* 导航左按钮 */}
          {this.renderLeftItem()}
          {/* 导航右按钮*/}
          {this.renderRightItem()}
          {/* 导航title */}
          {this.renderTitle()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBarStyle: {
    height: commonStyle.navHeight,
    backgroundColor: commonStyle.navThemeColor
  },
  navContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: commonStyle.navStatusBarHeight,
    height: commonStyle.navContentHeight,
    borderBottomWidth: 0.5,
    borderBottomColor: commonStyle.lineColor
  },
  leftImageStyle: {
    width: commonStyle.navImageWidth,
    height: commonStyle.navImageHeight,
  },
  leftItemStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: commonStyle.padding,
  },
  leftTitleStyle: {
    fontSize: commonStyle.navLeftTitleFont,
    color: commonStyle.navLeftTitleColor
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 80,
    right: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: commonStyle.navTitleFont,
    color: commonStyle.navTitleColor,
    textAlign: 'center',
  },
  rightImageStyle: {
    width: commonStyle.navImageWidth,
    height: commonStyle.navImageHeight
  },
  rightItemStyle: {
    backgroundColor: commonStyle.orange,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  rightTitleStyle: {
    fontSize: commonStyle.navRightTitleFont,
    color: commonStyle.navRightTitleColor
  }
})
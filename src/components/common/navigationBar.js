/**
 * Created by guangqiang on 2017/8/27.
 */

/**
 * 通用导航栏组件
 */
import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {commonStyle} from '../../utils/commonStyle'
import {Icon} from '../../utils/icon'
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
    let tempComponent
    if (this.navigationBarProps.hiddenLeftItem) {
      return <View style={{width: 40}}/>
    }
    const {onLeftPress} = this.props
    if (this.navigationBarProps.leftIcon) {
      let icon = this.navigationBarProps.leftIcon
      tempComponent = (
        <Icon name={`oneIcon|${icon.name}`} size={icon.size} color={icon.color}/>
      )
    } else if (this.navigationBarProps.leftTitle && this.navigationBarProps.leftTitle !== '') {
      tempComponent = (
        <Text style={[styles.leftTitleStyle, this.navigationBarProps.leftTitleStyle]}>{this.navigationBarProps.leftTitle}</Text>
      )
    } else {
      tempComponent = (
        // 需要注意，字体库名字不能写错，写错程序就会报错
        <Icon name={'oneIcon|nav_back_o'} size={20} color={commonStyle.iconGray}/>
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
        {
          this.navigationBarProps.subTitle ? <Text style={[styles.subTitleStyle, this.navigationBarProps.subTitleStyle]}>子标题</Text> : null
        }
      </View>
    )
  }

  renderRightItem() {
    let tempComponent
    if (this.navigationBarProps.hiddenRightItem) {
      return <View style={{width: 40}}/>
    }
    const {onRightPress} = this.props
    if (this.navigationBarProps.rightIcon) {
      let icon = this.navigationBarProps.rightIcon
      tempComponent = (
        <Icon name={`oneIcon|${icon.name}`} size={icon.size} color={icon.color}/>
      )
    } else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
      tempComponent = (
        <Text style={[styles.rightTitleStyle, this.navigationBarProps.rightTitleStyle]}>{this.navigationBarProps.rightTitle}</Text>
      )
    } else {
      tempComponent = (
        <View style={{width: 40}}/>
      )
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
      return <View/>
    }
    return (
      <View style={[styles.navBarStyle, this.navigationBarProps.navBarStyle]}>
        <View style={[styles.navContentStyle, this.navigationBarProps.navContentStyle]}>
          {/* 导航左按钮 */}
          {this.renderLeftItem()}
          {/* 导航title */}
          {this.renderTitle()}
          {/* 导航右按钮*/}
          {this.renderRightItem()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBarStyle: {
    height: commonStyle.navHeight,
    backgroundColor: commonStyle.navThemeColor,
    borderBottomWidth: 0.5,
    borderBottomColor: commonStyle.lineColor,
  },
  navContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: commonStyle.navStatusBarHeight,
    height: commonStyle.navContentHeight,
    marginHorizontal: 10,
  },
  leftImageStyle: {
    width: commonStyle.navImageWidth,
    height: commonStyle.navImageHeight,
  },
  leftItemStyle: {
    justifyContent: 'center',
    width: 40,
  },
  leftTitleStyle: {
    fontSize: commonStyle.navLeftTitleFont,
    color: commonStyle.navLeftTitleColor
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleStyle: {
    fontSize: commonStyle.navTitleFont,
    color: commonStyle.navTitleColor,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subTitleStyle: {
    fontSize: 11,
    marginTop: 5
  },
  rightImageStyle: {
    width: commonStyle.navImageWidth,
    height: commonStyle.navImageHeight
  },
  rightItemStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 40,
  },
  rightTitleStyle: {
    fontSize: commonStyle.navRightTitleFont,
    color: commonStyle.navRightTitleColor
  }
})
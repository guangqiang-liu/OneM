/**
 * Created by guangqiang on 2017/8/27.
 */
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import NavigationBar from '../common/navigationBar/navigationBar'
import {commonStyle} from '../../utils/commonStyle'
import {Actions} from "react-native-router-flux"
class BaseComponent extends Component {

  constructor(props) {
    super(props)
    this.navigationBarProps = this.navigationBarProps.bind(this)
    this._render = this._render.bind(this)
    this.onLeftPress = this.onLeftPress.bind(this)
    this.onRightPress = this.onRightPress.bind(this)
  }

  navigationBarProps() {
    return null
  }

  superFunc(data) {
    alert(`在子类中调用了父类的函数，${data}`)
  }

  onLeftPress() {
    Actions.pop()
  }

  onRightPress() {
    return null
  }

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
    backgroundColor: commonStyle.white
  }
})

export {BaseComponent}
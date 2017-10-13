/**
 * Created by guangqiang on 2017/8/30.
 */
import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import Button from 'react-native-button'
import {commonStyle} from '../../../utils/commonStyle'

let mode = 'debug'

const _onPress = (props, ...args) => {
  // HOOK 事件
  alert(props.children)
  // HOOK 后
  props.onPress && props.onPress(...args)
}

class _Button extends Component {

  render() {
    let children = this.props.children
    if (mode === 'debug') {
      if (!Array.isArray(children)) {
        children = [children]
      } else {
        children = [...this.props.children]
      }
      children.push(<Text key='btn' style={styles.textStyle}>VID</Text>)
    }
    return (
      <Button
        {...this.props}
        style={[styles.defaultStyle, this.props.style]}
        onPress={(...args) => _onPress(this.props, ...args)}>
        {children}
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 15,
    color: commonStyle.textGrayColor,
  },
  textStyle: {
    position: 'absolute',
    fontSize: 8,
    backgroundColor: 'green',
    top: 5,
    marginLeft: 5
  }
})

export {_Button as Button}
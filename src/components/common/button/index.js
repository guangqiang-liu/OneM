/**
 * Created by guangqiang on 2017/8/30.
 */

import React, {Component} from 'react'
import {Text, StyleSheet, Button} from 'react-native'

const _onPress = (props, ...args) => {
  // HOOK 事件
  alert(props.title)
  // HOOK 后
  props.onPress && props.onPress(...args)
}

class _Button extends Component {

  render() {
    console.log(this.props)
    return (
      <Button
        style={[styles.defaultStyle, this.props.style]}
        title={this.props.title}
        onPress={(...args) => _onPress(this.props, ...args)}
      >
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    fontSize: 8,
    backgroundColor: 'green'
  },
  defaultStyle: {
    fontSize: 15,
    color: 'red'
  }
})

export {_Button as Button}

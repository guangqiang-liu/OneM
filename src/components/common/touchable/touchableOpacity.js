/**
 * Created by guangqiang on 2017/9/1.
 */

import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'

let mode = 'debug'

const _onPress = (props, ...args) => {
  // HOOK 事件
  alert('HOOK 成功')
  // HOOK 后
  props.onPress && props.onPress(...args)
}

class _TouchableOpacity extends Component {

  render() {
    console.log(this.props)
    return (
      <TouchableOpacity
        style={[this.props.style]}
        onPress={(...args) => _onPress(this.props, ...args)}
      >
        <View>
          {this.props.children}
          {
            mode === 'debug' ? <Text style={styles.msgStyle}>dsad</Text> : null
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  // 打点信息样式
  msgStyle: {
    position: 'absolute',
    fontSize: 8,
    backgroundColor: 'green'
  }
})

export {_TouchableOpacity as TouchableOpacity}

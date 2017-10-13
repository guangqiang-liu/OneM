/**
 * Created by guangqiang on 2017/9/1.
 */
import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'
let mode = deviceInfo.mode
import {sendInteractiveLog} from '../../../utils/venilog/interactiveLog'

const _onPress = (props, ...args) => {
  // HOOK 事件
  sendInteractiveLog(props.vID, 3003, {})
  // HOOK 后
  props.onPress && props.onPress(...args)
}

// 有bug
class _TouchableOpacity extends Component {

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[this.props.style]}
        onPress={(...args) => _onPress(this.props, ...args)}>
        <View>
          {this.props.children}
          {
            mode === 'debug' ? <Text style={styles.logMsg}>VID</Text> : null
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  logMsg: {
    position: 'absolute',
    fontSize: 8,
    backgroundColor: 'green',
    top: 5,
    left: 5
  }
})

export {_TouchableOpacity as TouchableOpacity}
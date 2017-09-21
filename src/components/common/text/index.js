/**
 * Created by guangqiang on 2017/8/30.
 */
import React, {Component} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'

const _onPress = (props, ...args) => {
  // HOOK 事件
  // alert('Text: HOOK 成功')
  // HOOK 后
  props.onPress && props.onPress(...args)
}

let mode = 'xdebug'

class _Text extends Component {

  render() {
    return (
      <Text
        {...this.props}
        style={[styles.defaultStyle, this.props.style]}
        onPress={(...args) => _onPress(this.props, ...args)}>
        {this.props.children}
        {/* Text 组件封装点击事件，有点问题，Text组件最好不要绑定点击事件*/}
        {
          mode === 'debug' ? <Text style={styles.logMsg}>VIDrr4</Text> : null
        }
        </Text>
    )
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: 'transparent',
    color: commonStyle.drakGray,
    fontSize: commonStyle.textFont
  },
  logMsg: {
    position: 'absolute',
    fontSize: 8,
    top: 5,
    left: 5
  }
})

export {_Text as Text}
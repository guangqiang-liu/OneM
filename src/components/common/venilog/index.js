/**
 * Created by guangqiang on 2017/8/30.
 */

/** 日志打点组件 **/

import React, {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
const buildConfig = 'debug'
import {sendInteractiveLog} from '../../../utils/venilog/interactiveLog'

const _onPress = (props, ...args) => {
  let params = {}
  // params.entry = props.vEntry !== undefined ? JSON.stringify(props.vEntry) : JSON.stringify(args)
  sendInteractiveLog(props.vID, 3003, params)
  props.onPress && props.onPress(...args)
}

const createVenilogComponent = (component) => {
  let TempComponent = component
  return class extends Component {
    render() {
      if (TempComponent.displayName === 'TouchableOpacity') {
        let children = this.props.children
        if (buildConfig === 'debug') {
          if (!Array.isArray(children)) {
            children = [children]
          } else {
            children = [...this.props.children]
          }
          children.push(
            <Text style={styles.textStyle}>{this.props.vID}</Text>
          )
        }
        return (
          <TempComponent
            {...this.props}
            style={{width: 200, height: 200, backgroundColor: 'orange'}}
            // ...args: 这个是按钮点击事件的参数
            onPress={(...args) => _onPress(this.props, ...args)}
          >
            {children}
          </TempComponent>
        )
      } else if (TempComponent.displayName === 'Button') {
        // children为组件对应的子组件
        let children = this.props.children
        if (buildConfig === 'debug') {
          if (!Array.isArray(children)) {
            // 不是数组
            children = [children]
          } else {
            // 是数组，把数组中的子组件展开来
            children = [...this.props.children]
          }
          children.push(
            <Text style={styles.textStyle}>{this.props.vID}</Text>
          )
        }
        return (
          <TempComponent
            {...this.props}
            onPress={(...args) => _onPress(this.props, ...args)}
            title={this.props.children}
          >
          </TempComponent>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    fontSize: 8,
    backgroundColor: 'green'
  }
})

export const Venilog ={
  createVenilogComponent
}
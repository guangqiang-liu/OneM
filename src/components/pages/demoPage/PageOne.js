/**
 * Created by guangqiang on 2017/8/16.
 */
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {BaseComponent} from './../../base/baseComponent'

/**
 * PageOne 组件继承自 BaseComponent 组件
 */
export default class PageOne extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      title: 'pageOne'
    }
  }
  navigationBarProps() {
    return {
      title: this.state.title,
    }
  }

  onLeftPress() {
    Actions.pop()
  }

  _render() {
   return (
     <View>
       <Text onPress={Actions.pageTwo}>This is PageOne!</Text>
       <Text onPress={() => {
         this.setState({title: 'changed title'})
       }}>change title</Text>
     </View>
   )
 }
}
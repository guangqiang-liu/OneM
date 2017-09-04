/**
 * Created by guangqiang on 2017/8/17.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabView from './TabView'
export default class Tab3 extends Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <Text>Tab3</Text>
        <TabView/>
      </View>
    )
  }
}

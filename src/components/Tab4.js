/**
 * Created by guangqiang on 2017/8/17.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabView from './TabView'
export default class Tab4 extends Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <Text>Tab4</Text>
        <TabView/>
      </View>
    )
  }
}

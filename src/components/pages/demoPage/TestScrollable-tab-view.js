/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View} from 'react-native'
import {commonStyle} from '../../../utils'
import ScrollableTabView from 'react-native-scrollable-tab-view'
export default class TestScrollableTabView extends Component {

  render() {
    return (
      <View style={{flex: 1, marginTop: 10, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
        <ScrollableTabView>
          <View style={{flex: 1, backgroundColor: commonStyle.red}} tabLabel="React" />
          <View style={{flex: 1, backgroundColor: commonStyle.orange}} tabLabel="Flow" />
          <View style={{flex: 1, backgroundColor: commonStyle.yellow}} tabLabel="Jest" />
          <View style={{flex: 1, backgroundColor: commonStyle.green}} tabLabel="Jest" />
        </ScrollableTabView>
      </View>
    )
  }
}
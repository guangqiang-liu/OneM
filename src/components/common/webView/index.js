/**
 * Created by guangqiang on 2017/9/6.
 */

import React, {Component} from 'react'
import {StyleSheet, View, WebView} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'

export default class WebView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <WebView
          bounces={false}
          scalesPageToFit={true}
          source={{html: ''}}
          style={{
            width: deviceInfo.deviceWidth,
            height: deviceInfo.deviceHeight
          }}>
        </WebView>
      </View>
    )
  }
}

//样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
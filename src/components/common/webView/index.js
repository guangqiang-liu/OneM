/**
 * Created by guangqiang on 2017/9/6.
 */
import React, {Component} from 'react'
import {StyleSheet, View, WebView} from 'react-native'

export default class CustomWebView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={'webview'}
          startInLoadingState={true}
          source={{ uri: 'http://mcms.lian-shang.cn/article/channelList?platform=4&channel=6'}}
          userAgent={'dadad'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
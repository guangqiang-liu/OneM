/**
 * Created by guangqiang on 2017/9/6.
 */
import React, {Component} from 'react'
import {StyleSheet, View, WebView} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
export default class CustomWebView extends BaseComponent {

  navigationBarProps() {
    return {
      title: this.props.title,
      subTitleStyle: {
        color: commonStyle.white
      },
      titleStyle: {
        color: commonStyle.white
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#151C28',
      }
    }
  }

  _render() {
    const {url} = this.props
    return (
      <View style={styles.container}>
        <WebView
          ref={'webview'}
          startInLoadingState={true}
          source={{ uri: url}}
          userAgent={'userAgent'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  }
})
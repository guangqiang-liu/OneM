/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MessageBar, MessageBarManager} from 'react-native-message-bar'
import {commonStyle} from '../../../utils/commonStyle'
export default class TestMessageBar extends Component {

  msgBar(type) {
    MessageBarManager.showAlert({
      title: 'Your alert title goes here',
      message: 'Your alert message goes here',
      alertType: type,
    })
  }

  // 自定义Alert
  customMsgBar() {
    MessageBarManager.showAlert({

      /** Customize Alert Type **/
      alertType: 'info', // Alert Type: you can select one of 'success', 'error', 'warning', 'error', or 'custom' (use custom if you use a 5th stylesheet, all are customizable). Default is 'info'
      /* Customize the stylesheets and/or provide an additional one 'extra' */
      stylesheetInfo : { backgroundColor : '#007bff', strokeColor : '#006acd' }, // Default are blue colors
      // stylesheetSuccess : { backgroundColor : 'darkgreen', strokeColor : '#b40000' }, // Default are Green colors
      // stylesheetWarning : { backgroundColor : '#ff9c00', strokeColor : '#f29400' }, // Default are orange colors
      // stylesheetError : { backgroundColor : '#ff3232', strokeColor : '#FF0000' }, // Default are red colors
      // stylesheetExtra : { backgroundColor : 'black', strokeColor : 'gray' }, // Default are blue colors, same as info

      /** Customize Alert Content **/
      title: "John Doe", // Title of the alert
      message: "Hello, any suggestions?", // Message of the alert
      avatar: "http://img5.mtime.cn/mg/2017/01/25/172446.45527982.jpg", // Avatar/Icon <URL> of the alert or enter require('LOCALPATH') for local image
      /* Number of Lines for Title and Message */
      titleNumberOfLines: 1,
      messageNumberOfLines: 0, // Unlimited number of lines

      /** Customize Message Bar Alert Layout **/
      /* Style for the text elements and the  */
      titleStyle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
      messageStyle: { color: 'white', fontSize: 16 },
      avatarStyle: { height: 40, width: 40, borderRadius: 20 },

      /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
      // viewTopOffset : 10, // Default is 0
      // viewLeftOffset : 10, // Default is 0
      // viewRightOffset : 10, // Default is 0

      /* Inset of the view, useful if you want to apply a padding at your alert content */
      // viewTopInset : 10, // Default is 0
      // viewLeftInset : 10, // Default is 0
      // viewRightInset : 20, // Default is 0

      /** Customize Position and Animation, TwitterStyle!**/
      /* Position of the alert and Animation Type the alert is shown */
      // position: 'bottom',
      // animationType: 'SlideFromLeft',

    })
  }
  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <TouchableOpacity
          style={styles.cellStyle}
          onPress={() => this.msgBar('success')}>
          <Text>测试MessageBar(type：success)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellStyle}
          onPress={() => this.msgBar('warning')}>
          <Text>测试MessageBar(type：warning)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellStyle}
          onPress={() => this.msgBar('error')}>
          <Text>测试MessageBar(tyep：error)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellStyle}
          onPress={() => this.customMsgBar()}>
          <Text>测试MessageBar(自定义alert)</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    height: 40,
    backgroundColor: commonStyle.gray,
    marginBottom: 10
  }
})
/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import * as Progress from 'react-native-progress'
import deviceInfo from '../deviceInfo'
export default class ProgressHUD extends Component {
  render() {
    return (
      <View style={styles.baseViewStyle}>
        <View style={styles.backViewStyle}>
          <Progress.Circle size={deviceInfo.deviceWidth / 8} indeterminate={true} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    baseViewStyle: {
      position: 'absolute',
      top: (Platform.OS === 'ios') ? 64 : 44,
      height: (Platform.OS === 'ios') ? deviceInfo.deviceHeight - 64 : deviceInfo.deviceHeight - 44,
      width: deviceInfo.deviceWidth,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)'
    },
    backViewStyle: {
      backgroundColor: 'white',
      width: deviceInfo.deviceWidth / 4,
      height: deviceInfo.deviceWidth / 4,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: deviceInfo.deviceHeight / 4
    }
  }
)
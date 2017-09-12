/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import * as Progress from 'react-native-progress'
import deviceInfo from '../deviceInfo'
import {commonStyle} from '../commonStyle'
import {Actions} from 'react-native-router-flux'
export default class ProgressHUD extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.showHUD) {
      Actions.pop({ loading: true })
    }
  }

  render() {
    return (
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <Progress.Circle size={deviceInfo.deviceWidth / 8} indeterminate={true} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    maskStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: deviceInfo.deviceWidth,
      height: deviceInfo.deviceHeight,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backViewStyle: {
      backgroundColor: commonStyle.white,
      width: deviceInfo.deviceWidth / 4,
      height: deviceInfo.deviceWidth / 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  }
)
/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import * as Progress from 'react-native-progress'
import deviceInfo from '../deviceInfo'
import {Actions} from 'react-native-router-flux'
export default class ProgressHUD extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.showHUD) {
      Actions.pop({ loading: true })
    }
  }

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
      top: 0,
      height:deviceInfo.deviceHeight,
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
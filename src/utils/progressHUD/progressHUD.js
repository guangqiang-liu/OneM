/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
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
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          {/*<Progress.Circle size={deviceInfo.deviceWidth / 8} indeterminate={true} />*/}
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    maskStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: deviceInfo.deviceWidth,
      height: deviceInfo.deviceHeight,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backViewStyle: {
      backgroundColor: '#111',
      width: 120,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    }
  }
)
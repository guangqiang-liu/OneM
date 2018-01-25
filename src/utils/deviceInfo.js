/**
 * Created by guangqiang on 2017/8/27.
 */

/** 设备信息 **/

import {Dimensions, Platform} from 'react-native'
// import DeviceInfo from 'react-native-device-info'
export default deviceInfo = {
  // 设备宽度
  deviceWidth: Dimensions.get('window').width,
  // 设备高度
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
  // 设备系统
  deviceOS: Platform.OS,
  // 当前config: debug \ release
  mode: __DEV__ ? 'xdebug' : 'release'
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native'

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView']

import App from './src/containers/App'

AppRegistry.registerComponent('one', () => App)
// 待优化：封装基类UI组件、封装数组工具类，原始的数组很多方法的操作都不是返回处理完之后的数组，封装个工具类，返回处理完之后的数组
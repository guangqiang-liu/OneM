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
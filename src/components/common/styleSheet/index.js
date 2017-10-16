/**
 * Created by guangqiang on 2017/10/16.
 */
import React, { StyleSheet, Platform } from 'react-native'

class _EnhancedStyleSheet {

  static create(styleSheets) {
    let keys = Object.keys(styleSheets)
    keys.map((key) => {
      Object.keys(styleSheets[key]).map((property) => {
        if (Platform.OS === 'ios') {
          if (property.indexOf('_') === 0) {
            delete styleSheets[key][property]
          }
        } else if (Platform.OS === 'android') {
          if (property.indexOf('_') === 0) {
            let _newProp = property.substr(1)
            styleSheets[key][_newProp] = styleSheets[key][property]
            delete styleSheets[key][property]
          }
        }
      })
    })
    return StyleSheet.create(styleSheets)
  }

  static flatten(styleSheets) {
    return StyleSheet.flatten(styleSheets)
  }
}

export {_EnhancedStyleSheet as StyleSheet}
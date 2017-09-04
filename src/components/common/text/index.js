/**
 * Created by guangqiang on 2017/8/30.
 */

/** 包装官方Text **/
import {Text} from 'react-native'
import React, {Component} from 'react'
import { commonStyle } from '../../../utils/commonStyle'

export class FMText extends Component {
  render() {
    let textStyle = [{
      backgroundColor: 'transparent',
      color: commonStyle.drakGray,
      fontSize: commonStyle.textFont
    }]
    textStyle.push(this.props.style)
    return (
      <Text
        {...this.props}
        style={textStyle}>{this.props.children}</Text>
    )
  }
}

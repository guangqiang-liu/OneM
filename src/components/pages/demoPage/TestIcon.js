/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View} from 'react-native'
import {Icon} from '../../../utils/icon'
import {commonStyle} from '../../../utils'
export default class TestIcon extends Component {
  render() {
    return (
      <View style={{flex: 1, marginTop: 50, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
        <Icon name={'oneIcon|tb_Music_o'} size={15} color={commonStyle.red}/>

        <Icon name={'oneIcon|downLoad_o'} size={20} color={commonStyle.themeColor}/>

        <Icon name={'oneIcon|video_o'} size={25} color={commonStyle.cyan}/>

        <Icon name={'oneIcon|tb_article_o'} size={30} color={commonStyle.yellow}/>

      </View>
    )
  }
}
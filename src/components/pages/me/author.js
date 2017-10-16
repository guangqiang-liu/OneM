/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
export default class Author extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
        <TouchableOpacity>
          <Text>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>简书</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CSDN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>掘金</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>开发者头条</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CocoaChina</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>cnblogs</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>SegmentFault</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
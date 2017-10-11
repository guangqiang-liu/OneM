/**
 * Created by guangqiang on 2017/10/9.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
export default class PlusComment extends Component {

  render() {
    let tempData = this.props.plusData
    let data = {}
    if (this.props.type === 'list') {
      data.title = tempData.title
      data.content = tempData.content
      data.headImg = tempData.headurl
      data.nickname = tempData.nickname
      data.commentDate = tempData.modifyTime
      data.rating = tempData.rating
    } else {
      data = tempData
    }
    return (
      <View style={styles.cellStyle}>
        <Text style={{color: commonStyle.black, fontSize: 15, fontWeight: 'bold'}}>{data.title}</Text>
        <Text style={{color: commonStyle.textBlockColor, marginTop: 10, lineHeight: 20}}>{data.content}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: data.headImg}}/>
          <View style={{marginLeft: 10}}>
            <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{data.nickname}</Text>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{data.commentDate}</Text>
              {
                data.isWantSee ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>看过 - 评分</Text>
                  <View style={{backgroundColor: '#639C0C', paddingHorizontal: 2, paddingVertical: 5}}>
                    <Text style={{fontSize: 12, color: commonStyle.white}}>{data.rating}</Text>
                  </View>
                </View> : null
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor,
    marginLeft: 10,
    paddingRight: 10,
  }
})
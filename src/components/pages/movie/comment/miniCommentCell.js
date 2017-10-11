/**
 * Created by guangqiang on 2017/10/9.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Icon} from '../../../../utils/icon'
export default class MiniComment extends Component {

  render() {
    let tempData = this.props.miniData
    let data = {}
    if (this.props.type === 'list') {
      data.headImg = tempData.caimg
      data.nickname = tempData.ca
      data.rating = tempData.cr
      data.content = tempData.ce
      data.commentDate = tempData.cd
    } else {
      data = tempData
    }
    return (
      <View style={styles.cellStyle}>
        <View>
          <Image style={styles.avatar} source={{uri: data.headImg}}/>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
            <Text style={{color: commonStyle.drakGray}}>{data.nickname}</Text>
            <Text style={{color: '#639C0C', marginRight: 10}}>{`评 ${data.rating}`}</Text>
          </View>
          <Text style={{color: commonStyle.textBlockColor, lineHeight: 25}}>{data.content}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
            <Text style={{color: commonStyle.drakGray}}>{data.commentDate}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginTop: 5}}>
                  <Icon name={'oneIcon|comment_dot_o'} size={20} color={commonStyle.gray}/>
                </View>
                <Text style={{fontSize: 12, color: commonStyle.drakGray, marginLeft: 3}}>回复</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                <Icon name={'oneIcon|like_o'} size={25} color={commonStyle.gray}/>
                <Text style={{fontSize: 12, color: commonStyle.drakGray}}>赞</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  rightContent: {
    marginLeft: 10,
    flex: 1
  }
})
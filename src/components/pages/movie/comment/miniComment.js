/**
 * Created by guangqiang on 2017/10/9.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Icon} from '../../../../utils/icon'
export default class MiniComment extends Component {

  render() {
    let data = this.props.miniData
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
          <Text style={{color: commonStyle.textBlockColor, lineHeight: 25}}>角色塑造单薄得就像纸片人一样，电影节奏杂乱得就像​菜鸟编剧写的处女剧本一样。如果这些都可以因为开心麻花团队不是专业的电影工作者而被原谅，那么这部喜剧电影至少还有一点是绝对不能原谅的--大量令人尴尬的冷场笑料充斥了这部电影</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
            <Text style={{color: commonStyle.drakGray}}>{data.commentDate}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'oneIcon|like_o'} size={14} color={commonStyle.gray}/>
                <Text style={{fontSize: 12, color: commonStyle.drakGray}}>回复</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                <Icon name={'oneIcon|like_o'} size={14} color={commonStyle.gray}/>
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
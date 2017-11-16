/**
 * Created by guangqiang on 2017/9/21.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native'
import {Icon} from '../../../utils/icon'
import {commonStyle} from '../../../utils'
import {ShareModal} from '../../../components/common/shareModal'

export default class ToolBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shareModalVisible: false
    }
  }

  render() {
    let data = this.props.data
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={` 写一点评论..`}
          placeholderTextColor={commonStyle.textGrayColor}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
            <Icon name={'oneIcon|love_o'} size={20} color={commonStyle.textGrayColor}/>
            <Text style={{marginLeft: 5, fontSize: 12, color: commonStyle.textGrayColor}}>{data.praisenum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
            <Icon name={'oneIcon|comment_o'} size={17} color={commonStyle.textGrayColor}/>
            <Text style={{marginLeft: 5, fontSize: 12, color: commonStyle.textGrayColor}}>{data.commentnum}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}
            onPress={() => this.setState({shareModalVisible: true})}
          >
            <Icon name={'oneIcon|reply_o'} size={20} color={commonStyle.textGrayColor}/>
            <Text style={{marginLeft: 5, fontSize: 12, color: commonStyle.textGrayColor}}>{data.sharenum}</Text>
          </TouchableOpacity>
        </View>
        <ShareModal
          visible={this.state.shareModalVisible}
          onVisibleChange={(modalVisible) => this.setState({
            shareModalVisible: modalVisible
          })}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    borderTopColor: commonStyle.lineColor,
    borderTopWidth: 1,
    justifyContent: 'space-between'
  },
  textInput: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: commonStyle.gray,
    marginLeft: 20,
    fontSize: 13,
    borderRadius: 5
  }
})
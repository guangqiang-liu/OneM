/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'
import {Actions} from 'react-native-router-flux'
export default class ArticleListCell extends Component {

  handleData() {
    let data = this.props.rowData
    let obj = {}
    if (data.content_id) {
      obj.title = data.hp_title
      obj.authorName = data.author[0].user_name
      obj.content = data.guide_word
      obj.articeType = '短篇'
    } else if (data.serial_id) {
      obj.title = data.title
      obj.authorName = data.author.user_name
      obj.content = data.excerpt
      obj.articeType = '连载'
    } else if (data.question_id) {
      obj.title = data.question_title
      obj.authorName = data.answer_title
      obj.content = data.answer_content
      obj.articeType = '问答'
    }
    return obj
  }

  pushDetail() {
    let data = this.props.rowData
    if (data.content_id) {
      Actions.essayDetail({id: data.content_id})
    } else if (data.serial_id) {
      Actions.serialDetail({id: data.id})
    } else if (data.question_id) {
      Actions.questionDetail({id: data.question_id})
    }
  }

  render() {
    let data = this.handleData()
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.pushDetail()}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, fontSize: 15, marginBottom: 5, color: commonStyle.textBlockColor}}>{data.title}</Text>
          <View style={{borderRadius: 5, borderColor: commonStyle.themeColor, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 3, marginBottom: 5}}>
            <Text style={{color: commonStyle.themeColor}}>{data.articeType}</Text>
          </View>
        </View>
        <Text style={{fontSize: 13, marginBottom: 5}}>{data.content}</Text>
        <Text style={{fontSize: 13}}>{data.authorName}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    backgroundColor: commonStyle.bgColor,
    marginTop: 10,
    width: deviceInfo.deviceWidth,
    padding: 10
  }
})
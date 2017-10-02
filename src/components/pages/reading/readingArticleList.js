/**
 * Created by guangqiang on 2017/9/20.
 */
import React, {Component} from 'react'
import {View, ListView, Text, Image} from '../../common'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {articleType} from '../../../constants/commonType'
import {BaseComponent} from '../../base/baseComponent'

export default class ArticleList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

   switchTitle() {
    switch (this.props.articleType) {
      case 'essay':
        return '短篇'
        break;
      case 'serial':
        return '连载'
        break;
      case 'question':
        return '问答'
        break
    }
  }

  navigationBarProps() {
    return {
      title: this.switchTitle()
    }
  }

  componentDidMount() {
    const {articleType, year, month} = this.props
    this.props.getArticleCateList({type: articleType === 'serial' ? 'serialcontent' : articleType, year: year, month: month}).then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data)
      })
    })
  }

  pushDetail(id) {
    switch (this.props.articleType) {
      case articleType.ESSAY:
        Actions.essayDetail({id: id, articleType: this.props.articleType})
        break
      case articleType.SERIAL:
        Actions.serialDetail({id: id, articleType: this.props.articleType})
        break
      case articleType.QUESTIONS:
        Actions.questionDetail({id: id, articleType: this.props.articleType})
        break
    }
  }

  renderRow(rowData, sectionId, rowId) {
    let  data = {}
    if (this.props.articleType === 'essay') {
      data.img = rowData.author[0].web_url
      data.title = rowData.hp_title
      data.author = rowData.author[0].user_name
      data.id = rowData.content_id
    } else if (this.props.articleType === 'serial') {
      data.img = rowData.author.web_url
      data.title = rowData.title
      data.author = rowData.author.user_name
      data.id = rowData.id
    } else {
      data.img = rowData.asker_list[0].web_url
      data.title = rowData.question_title
      data.author = rowData.answer_content
      data.id = rowData.question_id
    }
    return (
      <TouchableOpacity
        style={styles.rowStyle}
        onPress={() => this.pushDetail(data.id)}>
        <Image style={{width: 40, height: 40, marginLeft: 20, marginVertical: 10}} source={{uri: data.img}}/>
        <View style={{marginHorizontal: 10, flex: 1, marginTop: 10}}>
          <Text style={{color: commonStyle.textBlockColor}}>{data.title}</Text>
          <Text style={{fontSize: 12, marginVertical: 10, color: commonStyle.textGrayColor, marginRight: 10}}>{this.props.articleType === 'question' ? data.author : `文 / ${data.author}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <ListView
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor,
    flexDirection: 'row',
  }
})
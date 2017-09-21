/**
 * Created by guangqiang on 2017/9/10.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ListView, TouchableOpacity, Text} from 'react-native'
import ArticleCell from './articleListCell'
export default class ArticleList extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(rowData, rowId) {
    return (
      <ArticleCell key={rowId} rowData={rowData}/>
    )
  }

  render() {
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.articleData)
    return (
      <ListView
        style={{backgroundColor: 'white'}}
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}
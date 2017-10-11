/**
 * Created by guangqiang on 2017/10/10.
 */
import React, {Component} from 'react'
import {ListView, StyleSheet} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {BaseComponent} from '../../../base/baseComponent'
import MiniCell from './miniCommentCell'
export default class MiniCommentList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      title: `短评(${this.props.miniTotalCount})`,
      titleStyle: {
        color: commonStyle.white
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#151C28',
      }
    }
  }

  componentDidMount() {
    this.props.getMiniComment({pageIndex: 1, movieId: this.props.id})
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <MiniCell key={rowId} miniData={rowData} type="list"/>
    )
  }

  _render() {
    let dataArr = this.props.miniCommenData || []
    let dataSource = this.state.dataSource.cloneWithRows(dataArr)
    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  }
})
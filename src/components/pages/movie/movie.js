/**
 * Created by guangqiang on 2017/9/4.
 */

import React, {Component} from 'react'
import {View, StyleSheet, Text, ListView, Image} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import Action from '../../../actionCreators/movie'
export default class Movie extends BaseComponent {

  constructor() {
    super()
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    Action.movieList(0).then((response) => {
      console.log(response.data)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.data)
      })
    })
  }

  navigationBarProps() {
    return {
      title: 'MOVIE',
      hiddenLeftItem: true
    }
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View>
        <Text>{rowData.title}</Text>
      </View>
    )
  }

  _render() {
    const {dataSource} = this.state
    return (
      <ListView
        style={styles.listViewStyle}
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  listViewStyle: {
    flex: 1
  },
  pic: {
  }
})
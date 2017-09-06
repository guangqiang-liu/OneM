/**
 * Created by guangqiang on 2017/9/4.
 */

import React from 'react'
import {StyleSheet, Text, ListView, TouchableOpacity} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
class MovieList extends BaseComponent {

  constructor() {
    super()
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.props.getMovieList(0).then((response) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.value.data)
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
      <TouchableOpacity
        style={styles.cellStyle}
        onPress={() => Actions.movieDetail({id: rowData.id})}
      >
        <Text>{rowData.title}</Text>
      </TouchableOpacity>
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
  cellStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: commonStyle.white,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  }
})

const _MovieList = connect(
  (state) => state.movie.movieList,
  Action.dispatch('movie')
)(MovieList)

export default _MovieList
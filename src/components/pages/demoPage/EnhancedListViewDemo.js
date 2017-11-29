/**
 * Created by guangqiang on 2017/9/15.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, EnhancedListView, InteractionManager} from './../../common'
class EnhancedListViewTest extends Component {

  constructor(props) {
    super(props)
    this.timer = null
  }

  _renderRowView(rowData, sectionID, rowID) {
    return (
      <View style={styles.cellStyle}>
        <Text>{rowID}</Text>
      </View>
    )
  }
  _onFetch(page = 1, callback, options) {
    this.timer = setTimeout(() => {
      var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)]
      if (page === 30) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        })
      } else {
        callback(rows)
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  fetchRequirement(...args) {
    InteractionManager.runAfterInteractions(() => {
      this.props.getMovieListForDemo(...args, 0)
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <EnhancedListView
          ref={'list'}
          lazyLoade={true}
          rowView={this._renderRowView.bind(this)}
          // onFetch={this.fetchRequirement.bind(this)}
          onFetch={this._onFetch}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 10,
    backgroundColor: '#eee',
  },
  cellStyle: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  }
})

export {EnhancedListViewTest}
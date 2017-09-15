/**
 * Created by guangqiang on 2017/9/15.
 */
import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableHighlight, InteractionManager } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {GiftedListView} from './CrazyListView'
import {commonStyle} from '../../../utils/commonStyle'

class EnhancedListView extends React.Component {

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Icon name={'refresh'} size={14} color={commonStyle.themeColor} />
        <Text style={customStyles.actionsLabel}>
          松开即可刷新
        </Text>
      </View>
    )
  }

  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView() {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Icon name={'arrow-down'} size={14} color={commonStyle.themeColor} />
          <Text style={customStyles.actionsLabel}>
            下拉刷新
          </Text>
        </View>
      )
    } else {
      return (
        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Icon name={'refresh'} size={14} color={commonStyle.themeColor} />
          <Text style={customStyles.actionsLabel}>
            松开即可刷新
          </Text>
        </TouchableHighlight>
      )
    }
  }

  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View />
    )
  }

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, { fontSize: 13 }]}>
          点击加载更多
        </Text>
      </TouchableHighlight>
    )
  }

  refresh() {
    this.refs.listView._refresh()
  }

  updateRows(rows, options, isRefresh) {
    if(this.props.lazyLoade){
      InteractionManager.runAfterInteractions(() => {
        this.refs.listView && this.refs.listView._updateRows(rows, options, isRefresh)
      })
    }else{
      this.refs.listView._updateRows(rows, options, isRefresh)
    }
  }

  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.empty}>
        <Icon name={'coffee'} size={200} color={'#ddd'} />
        <Text style={customStyles.emptyText}>暂无数据</Text>
      </View>
    )
  }

  render() {
    return (
      <GiftedListView
        {...this.props}
        initialListSize={18}
        ref={'listView'}
        firstLoader={true}
        pagination={true}
        refreshable={true}
        autoPaginate={true}
        lazyLoade={false}
        emptyView={this._renderEmptyView}
        refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
        refreshableWaitingView={this._renderRefreshableWaitingView}
        paginationAllLoadedView={this._renderPaginationAllLoadedView}
        paginationWaitingView={this._renderPaginationWaitingView}
        enableEmptySections={true}
        customStyles={{
          refreshableView: {
            backgroundColor: 'rgba(0,0,0,0)'
          }
        }}
      />
    )
  }
}

var customStyles = StyleSheet.create({
  refreshableView: {
    height: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionsLabel: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#ddd',
    marginTop: 10,
  }
})

export {EnhancedListView}
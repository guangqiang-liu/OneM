/**
 * Created by guangqiang on 2017/9/15.
 */
import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet, RefreshControl, ListView, ActivityIndicator} from '../index'
import {commonStyle} from '../../../utils/commonStyle'

class GiftedListView extends Component {

  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  componentWillMount() {
    this.onRefresh()
  }

  // 回调下拉刷新数据
  onRefresh() {
    this.props.fetchLatestData && this.props.fetchLatestData()
  }

  // 回调上拉加载更多
  onEndReached() {
    !this.props.refreshing && this.props.hasMore && this.props.fetchMoreData && this.props.fetchMoreData()
  }

  renderFooter() {
    if (this.props.refreshing) {
      return null
    }
    if (this.props.hasMore) {
      return (<ActivityIndicator color={'red'}/>)
    } else if (this.props.renderHasNoMoreView) {
      return this.props.renderHasNoMoreView()
    } else {
      return (
        <View style={styles.hasNoMoreView}>
          <Text style={styles.hasNoMoreText}>没有更多数据了</Text>
        </View>
      )
    }
  }

  // 另一种实现上拉加载函数
  _onScroll(event) {
    if(this.props.refreshing || !this.props.hasMore){
      return
    }
    let y = event.nativeEvent.contentOffset.y
    let height = event.nativeEvent.layoutMeasurement.height
    let contentHeight = event.nativeEvent.contentSize.height
    if(y + height >= contentHeight){
      this.props.fetchMoreData && this.props.fetchMoreData()
    }
  }

  _onRefresh() {
    this.onRefresh()
  }

  render() {
    return (
      <ListView
        {...this.props}
        enableEmptySections
        onEndReached={this.onEndReached}
        // onScroll={this._onScroll.bind(this)}
        renderFooter={this.renderFooter}
        onEndReachedThreshold={20}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={this._onRefresh.bind(this)}
            tintColor='red'
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="gray"/>
        }
      />
    )
  }
}

GiftedListView.propTypes = {
  emptyView: PropTypes.func,
  hasMore: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  fetchLatestData: PropTypes.func.isRequired,
  fetchMoreData: PropTypes.func.isRequired,
  renderHasNoMoreView: PropTypes.func
}

const styles = StyleSheet.create({
  hasNoMoreView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasNoMoreText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
  }
})

export {GiftedListView}
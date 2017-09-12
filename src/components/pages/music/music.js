/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ViewPager from 'react-native-viewpager'
import {BaseComponent} from '../../../components/base/baseComponent'
import {connect} from 'react-redux'
import MusicDetail from './musicDetail'
import Action from '../../../actions'
import action from '../../../actionCreators/music'
import {Actions} from 'react-native-router-flux'
import {articleType, beginTime} from '../../../constants/commonType'
class Music extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
      pageNum: 0
    }
  }

  navigationBarProps() {
    return {
      title: 'MUSIC',
      hiddenLeftItem: true
    }
  }

  componentDidMount() {
    action.musicIdList().then(response => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(response.data),
        pageNum: response.data.length -1
      })
    })
    // 这种写法，renderPage函数函数拿到不到值，不解？？？
    // this.props.getMusicId().then(response => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithPages(response.value.data),
    //   })
    // })
  }

  renderPage(rowData, rowId) {
    return (
      <MusicDetail {...this.props} key={rowId} id={parseInt(rowData)}/>
    )
  }

  onChangePage(index) {
    index === this.state.pageNum ? Actions.pastList({beginTime: beginTime.music, pageType: articleType.MUSIC}) : null
  }

  _render() {
    return (
      <ViewPager
        style={styles.container}
        onChangePage={this.onChangePage}
        renderPage={this.renderPage}
        dataSource={this.state.dataSource}
        renderPageIndicator={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const _Music = connect(
  (state) => state.music.music,
  Action.dispatch('music')
)(Music)

export default _Music
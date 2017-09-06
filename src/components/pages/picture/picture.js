/**
 * Created by guangqiang on 2017/9/4.
 */

import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'

import ViewPager from 'react-native-viewpager'

import PicDetail from './picDetail'

import {path} from '../../../constants/urls'
import action from '../../../actionCreators/picture'

import xxx from '../../../actions/picture'
import {Actions} from 'react-native-router-flux'
import {beginTime} from '../../../constants/beginTime'
class Home extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.state = {
      dataCount: 0,
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
    }
  }

  componentDidMount() {
    // 这里的  this.props.getPicList() 取到的值为undefined，不知道为啥？？？
    // let temp = this.props.getPicList()
    // console.log(temp)
    // temp.then((data) => {
    //   console.log(data)
    // })
    // getFetch('/hp/idlist/0', {}).then((data) => {
    //   console.log(data)
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithPages(data)
    //   })
    // })cc

    action.picList().then((response) => {
      let lenth = response.data.length
      let newArr = response.data.concat(response.data[lenth-1])
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(newArr),
        dataCount: lenth
      })
    })
  }

  navigationBarProps() {
    return {
      title: 'xxx',
      hiddenLeftItem: true
    }
  }

  _onChangePage(index) {
    if (index === this.state.dataCount) {
      // 这里是滑动最后一个，这时需要跳转界面到
      Actions.pastList({beginTime: beginTime.picture})
    }
  }

  renderPage(data, pageID) {
    return (
      <PicDetail key={data} id={parseInt(data)} />
    )
  }

  _render() {
    let dataArr = this.state.dataSource
    return (
      <ViewPager
        style={styles.container}
        onChangePage={(index) => this._onChangePage(index)}
        renderPage={this.renderPage}
        dataSource={dataArr}
        renderPageIndicator={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

const _Home = connect(
  (state) => state.picture.picList,
  Action.dispatch('picList')
)(Home)

export default _Home
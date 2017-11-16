/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import PicDetail from './picDetail'
import {Actions} from 'react-native-router-flux'
import {articleType, beginTime} from '../../../constants/commonType'
import action from '../../../actionCreators/picture'
class Home extends Component {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.state = {
      dataCount: 0,
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
    }
  }

  componentDidMount() {
    action.picList().then(response => {
      let dataArr = response.data
      let length = dataArr.length
      let newArr = dataArr.concat(dataArr[length-1])
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(newArr),
        dataCount: length
      })
    })
  }

  _onChangePage(index) {
    if (index === this.state.dataCount) {
      Actions.pastList({beginTime: beginTime.picture, pageType: articleType.PICTURE})
    }
  }

  renderPage(data, pageID) {
    return (
      <PicDetail {...this.props} id={parseInt(data)} />
    )
  }

  render() {
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
  Action.dispatch('picture')
)(Home)

export default _Home
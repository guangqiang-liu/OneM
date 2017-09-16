/**
 * Created by guangqiang on 2017/9/4.
 */

import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ListView} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import action from '../../../actionCreators/reading'
import deviceInfo from '../../../utils/deviceInfo'
import Swiper from 'react-native-swiper'
import {commonStyle} from '../../../utils/commonStyle'
import ArticleList from './articleList'
class Reading extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
      bannerList: [],
    }
  }

  componentDidMount() {
    Promise.all([action.readingBannerList(), action.readingArticleList()]).then(response => {
      this.setState({
        bannerList: response[0].data,
        dataSource: this.state.dataSource.cloneWithPages(this.packData(response[1].data))
      })
    })
  }

  navigationBarProps() {
    return {
      title: 'dada',
      hiddenLeftItem: true
    }
  }

  packData(data) {
    let minLength = Math.min(data.essay.length, data.serial.length, data.question.length)
    let tempArr = []
    for (var i = 0; i < minLength; i++) {
      tempArr.push([data.essay[i], data.serial[i], data.question[i]])
    }
    return tempArr
  }

  renderPage(rowData, sectionId, rowId) {
   return (
     <ArticleList key={rowId} articleData={rowData}/>
   )
  }

  renderImg() {
    let picArr = this.state.bannerList || []
    let imgArr = []
    if (picArr.length) {
      for (var i = 0; i < picArr.length; i++) {
        imgArr.push(
          <TouchableOpacity
            key={i}
          >
            <Image style={{height: 150}} source={{uri: picArr[i].cover}} key={i}/>
          </TouchableOpacity>
        )
      }
      return imgArr
    } else {
      return (
        <View/>
      )
    }
  }

  renderBanner() {
    return (
      <Swiper
        height={200}
        autoplay
        loop
        dot={<View style={styles.dotStyle}/>}
        activeDot={<View style={styles.activeDot}/>}
      >
        {this.renderImg()}
      </Swiper>
    )
  }

  _render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderBanner()}
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          renderPageIndicator={false}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  cellStyle: {
    flexDirection: 'row',
    backgroundColor: commonStyle.green
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }
})

const _Reading = connect(
  (state) => state.reading.reading,
  Action.dispatch('reading')
)(Reading)

export default _Reading
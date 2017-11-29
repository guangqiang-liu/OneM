/**
 * Created by guangqiang on 2017/9/4.
 */
import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import action from '../../../actionCreators/reading'
import Swiper from 'react-native-swiper'
import {commonStyle} from '../../../utils/commonStyle'
import ArticleList from './articleList'
import {Actions} from 'react-native-router-flux'
class Reading extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.imgClick = this.imgClick.bind(this)
    this.timer = null
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
      bannerList: [],
      swiperShow: false,
      imageIndex: 0,
      articleLength: 0
    }
  }

  componentDidMount() {
    Promise.all([action.readingBannerList(), action.readingArticleList()]).then(response => {
      this.timer = setTimeout(() => {
        this.setState({
          bannerList: response[0].data,
          dataSource: this.state.dataSource.cloneWithPages(this.packData(response[1].data)),
          swiperShow: true,
          articleLength:this.packData(response[1].data).length
        })
      }, (10))
    })
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  navigationBarProps() {
    return {
      title: '阅读',
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

  imgClick(i, e) {
    let data  = this.state.bannerList[i]
    Actions.bannerDetail({data: data})
  }

  renderImg() {
    tempArr = []
    let picArr = this.state.bannerList || []
    for (var i = 0; i < picArr.length; i++) {
      tempArr.push(
        <TouchableOpacity ref={i} key={i} onPress={this.imgClick.bind(this, i)}>
          <Image style={{height: 150}}
                 source={{uri: picArr[i].cover}}/>
        </TouchableOpacity>
      )
    }
    return tempArr
  }

  _onChangePage(index) {
    if (index === this.state.articleLength -1) {
      Actions.readingTab()
    }
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView
          removeClippedSubviews={false}
        >
          {
            this.state.swiperShow ? <Swiper style={styles.wrapper} height={200} autoplay loop>
              {this.renderImg()}
            </Swiper> : <View/>
          }
          <ViewPager
            onChangePage={(index) => this._onChangePage(index)}
            dataSource={this.state.dataSource}
            renderPage={this.renderPage}
            renderPageIndicator={false}
          />
        </ScrollView>
      </View>
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
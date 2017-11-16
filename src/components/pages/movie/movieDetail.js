/**
 * Created by guangqiang on 2017/10/9.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView, Platform, findNodeHandle} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {VibrancyView, BlurView} from 'react-native-blur'
import deviceInfo from '../../../utils/deviceInfo'
import {Icon} from '../../../utils/icon'
import MiniComment from './comment/miniCommentCell'
import PlusComment from './comment/plusCommentCell'
import {Actions} from 'react-native-router-flux'
import {StyleSheet} from '../../common'
import {ShareModal} from '../../../components/common/shareModal'

export default class MovieDetail extends Component {

  constructor(props) {
    super(props)
    this.navBar = null
    this.state = {
      viewRef: null,
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.props.getMovieDetail({movieId: this.props.id})
    this.props.getMovieComment({movieId: this.props.id})
  }

  renderActorList(arr, id) {
    return arr.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{marginLeft: 10, width: 80, alignItems: 'center'}}
        onPress={() => Actions.actorList({id: id})}
      >
        <Image
          style={{width: 80, height: 80}}
          source={{uri: item.img}}
        />
        <Text numberOfLines={1} style={styles.actorStyle}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.actorStyle}>{item.nameEn}</Text>
        <Text numberOfLines={1} style={styles.actorStyle}>{item.roleName}</Text>
      </TouchableOpacity>
    ))
  }

  renderGoodsList(arr) {
    return arr.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{marginLeft: 10, width: 102}}
        onPress={() => Actions.webView({url: item.goodsUrl, title: item.name})}
      >
        <View style={{borderColor: commonStyle.lineColor, borderWidth: 1}}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: item.image}}
          />
          <Text style={{position: 'absolute', color: commonStyle.white, fontSize: 12, backgroundColor: '#1B9DB1', padding: 2}}>新品</Text>
        </View>
        <Text style={styles.goodsStyle}>{item.name}</Text>
        <Text style={[styles.goodsStyle, {color: '#FD7108', marginBottom: 5}]}>{`￥${item.minSalePriceFormat}`}</Text>
      </TouchableOpacity>
    ))
  }

  renderMiniComment(arr) {
    return arr.map((item, index) => (
      <MiniComment key={index} miniData={item}/>
    ))
  }

  renderPlusComment(arr) {
    return arr.map((item, index) => (
      <PlusComment key={index} plusData={item}/>
    ))
  }

  renderStory(arr) {
    return (
      arr.map((item, index) => (
        <Text key={index} style={{color: commonStyle.textBlockColor, fontSize: 13, marginTop: 3}}>{`${item} `}</Text>
      ))
    )
  }

  _onScroll(event) {
    let y = event.nativeEvent.contentOffset.y
    let opacityPercent = y / 64
    if (y < 64) {
      this.navBar.setNativeProps({
        style: {opacity: opacityPercent}
      })
    } else {
      this.navBar.setNativeProps({
        style: {opacity: 1}
      })
    }
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)})
  }

  renderContent() {
    let data = this.props.movieDetail
    let basic = data.basic
    let boxOffice = data.boxOffice
    let live = data.live
    let related = data.related
    let video = basic.video
    let miniData = this.props.commentData.mini
    let plusData = this.props.commentData.plus
    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={this._onScroll.bind(this)}
          scrollEventThrottle={20}
          bounces={false}
        >
          <Image
            ref={(img) => { this.backgroundImage = img}}
            style={styles.bgContainer}
            source={{uri: basic.img}}
            resizeMode='stretch'
            onLoadEnd={() => this.imageLoaded()}
          />
          <View style={styles.bgContainer}>
            {
              Platform.OS === 'ios' ?
                <VibrancyView
                  blurType={'light'}
                  blurAmount={10}
                  style={styles.container}
                /> :
                <BlurView
                  style={styles.absolute}
                  viewRef={this.state.viewRef}
                  blurType="light"
                  blurAmount={10}
                />
            }
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.headerStyle}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}
                onPress={() => Actions.trailerList({id: basic.movieId})}
              >
                <Image
                  style={styles.img}
                  source={{uri: basic.img}}
                  resizeMode='contain'
                />
                <View style={{position: commonStyle.absolute}}>
                  <Icon name={'oneIcon|play_cycle_o'} size={40} color={commonStyle.white}/>
                </View>
              </TouchableOpacity>
              <View style={styles.rightContent}>
                <Text style={{color: commonStyle.white, fontSize: 16, marginVertical: 5}}>{basic.name}</Text>
                <Text style={{color: commonStyle.white, fontSize: 13, marginBottom: 8}}>{basic.nameEn}</Text>
                <View style={{flexDirection: 'row'}}>
                  {
                    basic.isEggHunt ? <Text style={{color: '#588F03', fontSize: 12}}>有彩蛋-</Text> : null
                  }
                  <Text style={{fontSize: 12, color: commonStyle.textBlockColor}}>{basic.mins}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {
                    this.renderStory(basic.type)
                  }
                </View>
                <Text style={{color: commonStyle.textBlockColor, fontSize: 13, marginTop: 3}}>{`${basic.releaseDate}-${basic.releaseArea}上映`}</Text>
                <Text numberOfLines={1} style={{fontSize: 13, color: commonStyle.textBlockColor, marginTop: 3}}>{`@${basic.commentSpecial}`}</Text>
                <View style={{flexDirection: 'row' ,marginTop: 5}}>
                  <View style={styles.borderText}>
                    <Text style={{paddingHorizontal: 5, paddingVertical: 2, color: '#64788E', fontSize: 10}}>中国巨幕</Text>
                  </View>
                  {
                    basic.isIMAX ? <View style={styles.borderText}>
                      <Text style={{paddingHorizontal: 5, paddingVertical: 2, color: '#64788E', fontSize: 10}}>IMAX</Text>
                    </View> : null
                  }
                </View>
              </View>
              <View style={{width: 40, marginTop: 30}}>
                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#588F03', height: 40}}>
                  <Text style={{fontSize: 15, color: commonStyle.white}}>{basic.overallRating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={{color: commonStyle.textBlockColor, lineHeight: 20}}>{`剧情： ${basic.story}`}</Text>
            </View>
            <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
              <TouchableOpacity
                style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                onPress={() => Actions.actorList({id: basic.movieId})}
              >
                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>导演</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                  <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                </View>
              </TouchableOpacity>
              <ScrollView
                style={{height: 120, margin: 10, marginLeft: 0, marginTop: 0}}
                horizontal={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.renderActorList([basic.director], basic.movieId)}
              </ScrollView>
            </View>
            <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
              <TouchableOpacity
                style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                onPress={() => Actions.actorList({id: basic.movieId})}
              >
                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>演员</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                  <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                </View>
              </TouchableOpacity>
              <ScrollView
                style={styles.actorCell}
                horizontal={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.renderActorList(basic.actors, basic.movieId)}
              </ScrollView>
            </View>
            {
              live.count >= 1 ?
                <View>
                  <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>直播</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{live.count}</Text>
                      <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                    </View>
                  </View>
                  <View style={styles.liveContent}>
                    <Image
                      style={{width: 100, height: 60}}
                      source={{uri: live.img}}
                      resizeMode='contain'
                    />
                    <View style={{flex: 1, marginLeft: 10}}>
                      <Text style={{color: commonStyle.textBlockColor, marginBottom: 5}}>{live.title}</Text>
                      <Icon name={'oneIcon|video_o'} size={15} color={commonStyle.red}/>
                      <Text style={{color: commonStyle.textGrayColor, marginVertical: 5, fontSize: 12}}>{live.playNumTag}</Text>
                    </View>
                  </View>
                </View> : null
            }
            <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomColor: commonStyle.lineColor, borderBottomWidth: 10}}>
              <TouchableOpacity style={{flex: 1}} onPress={() => Actions.trailerList({id: basic.movieId})}>
                <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>视频</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                    <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{video.count}</Text>
                    <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                  </View>
                </View>
                <View
                  style={{marginHorizontal: 10, borderRightColor: commonStyle.lineColor, borderRightWidth: 1, paddingRight: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}
                >
                  <Image
                    style={{height: 120, width: deviceInfo.deviceWidth - 150}}
                    source={{uri: video.img}}
                    resizeMode='cover'
                  />
                  <View style={{position: commonStyle.absolute}}>
                    <Icon name={'oneIcon|play_cycle_o'} size={40} color={commonStyle.white}/>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 120}} onPress={() => Actions.pictureList({id: basic.movieId, title: basic.name, subTitle: basic.nameEn})}>
                <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>图片</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{basic.stageImg.count}</Text>
                    <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                  </View>
                </View>
                <View style={{marginRight: 10, paddingRight: 10, backgroundColor: 'red'}}>
                  <Image
                    style={{width: 110, height: 120}}
                    source={{uri: basic.stageImg.list[0].imgUrl}}
                    resizeMode='cover'
                  />
                </View>
              </TouchableOpacity>
            </View>
            {
              related.goodsList.length ? <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>{`周边商品(${related.goodsCount})`}</Text>
                </View>
                <View style={{padding: 0}}>
                  <ScrollView
                    style={{height: 155, margin: 10, marginLeft: 0, marginTop: 0}}
                    horizontal={true}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.renderGoodsList(related.goodsList)}
                  </ScrollView>
                </View>
              </View> : null
            }
            {
              boxOffice.ranking !== 0 ? <View style={{borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
                <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>票房</Text>
                </View>
                <View style={styles.boxOffice}>
                  <View style={styles.boxOfficeItem}>
                    <Text style={styles.boxOfficeValue}>{boxOffice.ranking}</Text>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={styles.boxOfficeText}>票房排名</Text>
                      <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                    </View>
                  </View>
                  <View style={styles.boxOfficeItem}>
                    <Text style={styles.boxOfficeValue}>{boxOffice.todayBoxDes}</Text>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={styles.boxOfficeText}>{boxOffice.todayBoxDesUnit}</Text>
                      <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                    </View>
                  </View>
                  <View style={styles.boxOfficeItem}>
                    <Text style={styles.boxOfficeValue}>{boxOffice.totalBoxDes}</Text>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={styles.boxOfficeText}>{boxOffice.totalBoxUnit}</Text>
                      <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                    </View>
                  </View>
                </View>
              </View> : null
            }
            <View>
              <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>短评</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                  <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                </View>
              </View>
              {this.renderMiniComment(miniData.list)}
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center', height: 50, borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}
                onPress={() => Actions.miniComment({id: basic.movieId})}
              >
                <Text style={{color: '#FD7108', fontSize: 15}}>{`查看更多${miniData.total}条短评`}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: commonStyle.textBlockColor, fontSize: 15}}>影评</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                  <Icon name={'oneIcon|music_playing_s'} size={12} color={commonStyle.black}/>
                </View>
              </View>
              {this.renderPlusComment(plusData.list)}
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center', height: 40}}
                onPress={() => Actions.plusComment({id: basic.movieId, title: basic.name})}
              >
                <Text style={{color: '#FD7108', fontSize: 15}}>{`查看更多${plusData.total}条短评`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* 底部操作栏 */}
        <View style={styles.bottomToolBar}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 120, justifyContent: 'space-around', height: 49, backgroundColor: commonStyle.bgColor}}>
            <View style={{alignItems: 'center', marginLeft: 10}}>
              <Icon name={'oneIcon|love_o'} size={18} color={commonStyle.gray}/>
              <Text style={{fontSize: 11, color: commonStyle.gray}}>想看</Text>
            </View>
            <View style={{width: 0.5, height: 20, backgroundColor: commonStyle.textGrayColor}}/>
            <View style={{alignItems: 'center', marginRight: 10}}>
              <Icon name={'oneIcon|comment_o'} size={16} color={commonStyle.gray}/>
              <Text style={{fontSize: 11, color: commonStyle.gray}}>评论</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F37207', height: 49}}>
            <Text style={{color: commonStyle.white, fontSize: 17}}>选座购票</Text>
          </View>
        </View>
        {/* 顶部渐变导航栏 */}
        <View
          style={[styles.navBarStyle, {backgroundColor: commonStyle.clear}]}>
          <View style={styles.navComtentStyle}>
            <Icon name={'oneIcon|nav_back_o'} size={20} color={commonStyle.white}/>
            <Text style={{color: commonStyle.white, fontSize: 17}}>{``}</Text>
            <View style={{marginRight: 5}}>
              <Icon name={'oneIcon|share_o'} size={20} color={commonStyle.white}/>
            </View>
          </View>
        </View>
        <View
          ref={ref => this.navBar = ref}
          style={[styles.navBarStyle, {opacity: 0}]}>
          <View style={styles.navComtentStyle}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Icon name={'oneIcon|nav_back_o'} size={20} color={commonStyle.white}/>
            </TouchableOpacity>
            <Text style={{color: commonStyle.white, fontSize: 17}}>{basic.name}</Text>
            <TouchableOpacity style={{marginRight: 5}} onPress={() => this.setState({modalVisible: true})}>
              <Icon name={'oneIcon|share_o'} size={20} color={commonStyle.white}/>
            </TouchableOpacity>
          </View>
        </View>
        <ShareModal
          visible={this.state.modalVisible}
          onVisibleChange={(modalVisible) => this.setState({
            modalVisible: modalVisible
          })}/>
      </View>
    )
  }

  render() {
    let data = this.props.movieDetail
    let commentData = this.props.commentData
    return (
      data.basic && commentData.mini ?
        this.renderContent() : <View/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bgContainer: {
    position: 'absolute',
    height: 120,
    width: deviceInfo.deviceWidth
  },
  contentStyle: {
    flex: 1,
    marginTop: 120,
    backgroundColor: commonStyle.white
  },
  headerStyle: {
    marginTop: -50,
    _marginTop: 0,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  img: {
    width: 100,
    height: 150
  },
  rightContent: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 10
  },
  borderText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    marginRight: 10,
    borderColor: '#64788E'
  },
  content: {
    padding: 10,
    backgroundColor: commonStyle.white,
    borderTopWidth: 10,
    borderTopColor: commonStyle.lineColor,
    borderBottomWidth: 10,
    borderBottomColor: commonStyle.lineColor
  },
  actorStyle: {
    fontSize: 12,
    color: commonStyle.textBlockColor,
    marginTop: 5
  },
  liveContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 0
  },
  goodsStyle: {
    fontSize: 12,
    color: commonStyle.textBlockColor,
    marginTop: 5
  },
  boxOffice: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: 0
  },
  boxOfficeItem: {
    alignItems: 'center'
  },
  boxOfficeText: {
    marginVertical: 10,
    color: commonStyle.gray,
    fontSize: 12
  },
  boxOfficeValue: {
    color: '#F37407',
    fontSize: 20
  },
  bottomToolBar: {
    flexDirection: 'row',
    height: 49,
    alignItems: 'center'
  },
  navBarStyle: {
    height: 64,
    backgroundColor: '#161C28',
    position: 'absolute',
    width: deviceInfo.deviceWidth,
  },
  navComtentStyle: {
    height: 44,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  actorCell: {
    height: 135,
    _height: 140,
    margin: 10,
    marginLeft: 0,
    marginTop: 0
  }
})
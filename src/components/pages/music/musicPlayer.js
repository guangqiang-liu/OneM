/**
 * Created by guangqiang on 2017/9/9.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Slider, Animated, Easing, Platform, findNodeHandle, NativeModules} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'
import {commonStyle} from '../../../utils/commonStyle'
import Video from 'react-native-video'
import {Actions} from 'react-native-router-flux'
import {MessageBarManager} from 'react-native-message-bar'
import {VibrancyView, BlurView} from 'react-native-blur'
import {Icon} from '../../../utils/icon'
import {formatTime} from '../../../utils/formatTime'
import {ShareModal} from '../../../components/common/shareModal'

// 音乐列表mock数据
const mockList = require('../../../assets/data/musicList.json')

export default class MusicPlayer extends Component {

  constructor(props) {
    super(props)
    this.player = ''
    this.rotation = false
    this.musicList = mockList.list
    this.state = {
      viewRef: null,
      paused: false,
      duration: 0.00,
      slideValue: 0.00,
      currentTime: 0.00,
      currentIndex: 0,
      playMode: 0,
      spinValue: new Animated.Value(0),
      playIcon: 'music_paused_o',
      playModeIcon: 'music_cycle_o',
      shareModalVisible: false
    }
    this.spinAnimated = Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 6000,
      easing: Easing.inOut(Easing.linear)
    })
  }

  static onEnter = () => {
    Actions.refresh({
      title: 'MUSIC',
      rightTitle: '分享',
      leftTitle: '返回',
      onRight: () => {alert('click')}
    })
  }

  spining() {
    if (this.rotation) {
      this.state.spinValue.setValue(0)
      this.spinAnimated.start(() => {
        this.spining()
      })
    }
  }

  spin() {
    this.rotation = !this.rotation
    if (this.rotation) {
      this.spinAnimated.start(() => {
        this.spinAnimated = Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.linear)
        })
        this.spining()
      })
    } else {
      this.state.spinValue.stopAnimation((oneTimeRotate) => {
        this.spinAnimated = Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: (1 - oneTimeRotate) * 6000,
          easing: Easing.inOut(Easing.linear)
        })
      })
    }
  }

  componentDidMount() {
    this.spin()

    /** 注意：由于虾米音乐接口更新，网络请求不到数据，暂时使用mock数据代替 **/

    // this.props.getMusicList(2017, 6, {}).then(response =>{
    //   console.log(response)
    // })
    // this.props.getxiamiMusic(this.props.music_id).then(response =>{
    //   console.log(response)
    // })
  }

  setDuration(duration) {
    this.setState({duration: duration.duration})
  }

  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime)
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime
    })
  }

  nextSong(currentIndex) {
    this.reset()
    this.setState({currentIndex: currentIndex >= mockList.list.length ? 0 : currentIndex})
    // currentIndex === this.props.musicList.length ? currentIndex = 0 : currentIndex
    // let newSong = this.props.musicList[currentIndex]
    // let music_id = newSong.music_id
    // if (!isNaN(parseInt(music_id))) {
    //   this.props.getxiamiMusic(music_id)
    //   // 此处音乐播放器有bug
    //   this.setState({currentIndex})
    // } else {
    //   this.nextSong(currentIndex + 1)
    //   this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
    // }
  }

  preSong(currentIndex) {
    this.reset()
    this.setState({currentIndex: currentIndex < 0 ? mockList.list.length - 1 : currentIndex})
    // currentIndex === -1 ? currentIndex = this.props.musicList.length -1 : currentIndex
    // let newSong = this.props.musicList[currentIndex]
    // let music_id = newSong.music_id
    // if (!isNaN(parseInt(music_id))) {
    //   this.props.getxiamiMusic(music_id)
    //   this.setState({currentIndex})
    // } else {
    //   this.preSong(currentIndex - 1)
    //   this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
    // }
  }

  reset() {
    this.props.resetMusicInfo()
    this.setState({
      currentTime: 0.00,
      slideValue: 0.00
    })
  }

  play() {
    this.spin()
    this.setState({
      paused: !this.state.paused,
      playIcon: this.state.paused ? 'music_paused_o' : 'music_playing_s'
    })
  }

  playMode(playMode) {
    playMode ++
    playMode = playMode === 3 ? playMode = 0 : playMode
    switch (playMode) {
      case 0:
        this.setState({playMode, playModeIcon: 'music_cycle_o'})
        break
      case 1:
        this.setState({playMode, playModeIcon: 'music_single_cycle_o'})
        break
      case 2:
        this.setState({playMode, playModeIcon: 'music_random_o'})
        break
      default:
        break
    }
  }

  onEnd(data) {
    this.showMessageBar('亲！')('已帮你切换到下一首')('fuccess')
    if (this.state.playMode === 0) {
      this.nextSong(this.state.currentIndex + 1)
    } else if (this.state.playMode === 1) {
      this.player.seek(0)
    } else {
      this.nextSong(Math.floor(Math.random() * this.props.musicList.length))
    }
  }

  videoError(error) {
    this.showMessageBar('播放器报错啦！')(error)('error')
  }

  showMessageBar = title => msg => type => {
    MessageBarManager.showAlert({
      title: title,
      message: msg,
      alertType: type,
    })
  }

  renderPlayer() {
    // let musicInfo = this.props.musicInfo
    let musicInfo = mockList.list[this.state.currentIndex]
    return (
      <View style={styles.bgContainer}>
        <View style={styles.navBarStyle}>
          <View style={styles.navBarContent}>
            <TouchableOpacity
              style={{marginTop: 5}}
              onPress={() => Actions.pop()}
            >
              <Icon name={'oneIcon|nav_back_o'} size={20} color={commonStyle.white}/>
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>{musicInfo.title}</Text>
              <Text style={styles.subTitle}>子标题</Text>
            </View>
            <TouchableOpacity
              style={{marginTop: 5}}
              onPress={() => this.setState({shareModalVisible: true})}
            >
              <Icon name={'oneIcon|share_o'} size={20} color={commonStyle.white}/>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={styles.djCard}>
        </View>
        <Image
          style={{width: 260, height: 260, alignSelf: 'center', position: 'absolute', top: 190}}
          source={require('../../../assets/images/musicPlayer/胶片盘.png')}
        />
        <Animated.Image
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            alignSelf: 'center',
            position: 'absolute', top: 235,
            transform: [{rotate: this.state.spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })}]
          }}
          source={{uri: musicInfo.cover}}
        />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 50, justifyContent: 'space-around', bottom: -60}}>
            <Icon name={'oneIcon|love_o'} size={20} color={commonStyle.white}/>
            <Icon name={'oneIcon|downLoad_o'} size={20} color={commonStyle.white}/>
            <Icon name={'oneIcon|comment_o'} size={20} color={commonStyle.white}/>
            <Icon name={'oneIcon|more_v_o'} size={20} color={commonStyle.white}/>
          </View>
          <View style={styles.progressStyle}>
            <Text style={{width: 35, fontSize: 11, color: commonStyle.white, marginLeft: 5}}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
            <Slider
              style={styles.slider}
              value={this.state.slideValue}
              maximumValue={this.state.duration}
              minimumTrackTintColor={commonStyle.themeColor}
              maximumTrackTintColor={commonStyle.iconGray}
              step={1}
              onValueChange={value => this.setState({currentTime: value})}
              onSlidingComplete={value => this.player.seek(value)}
            />
            <View style={{width: 35, alignItems: 'flex-end', marginRight: 5}}>
              <Text style={{fontSize: 11, color: commonStyle.white}}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
            </View>
          </View>
          <View style={styles.toolBar}>
            <TouchableOpacity
              style={{width: 50, marginLeft: 5}}
              onPress={() => this.playMode(this.state.playMode)}
            >
              <Icon name={`oneIcon|${this.state.playModeIcon}`} size={16} color={commonStyle.white}/>
            </TouchableOpacity>
            <View style={styles.cdStyle}>
              <TouchableOpacity
                onPress={() => this.preSong(this.state.currentIndex - 1)}
              >
                <Icon name={'oneIcon|music_pre_o'} size={35} color={commonStyle.white}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: 35, height: 35, borderRadius: 20, borderWidth: 1, borderColor: commonStyle.white, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.play()}
              >
                <Icon name={`oneIcon|${this.state.playIcon}`} size={20} color={commonStyle.white}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.nextSong(this.state.currentIndex + 1)}
              >
                <Icon name={'oneIcon|music_next_o'} size={25} color={commonStyle.white}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{width: 50, alignItems: 'flex-end', marginRight: 5}}
            >
              <Icon name={'oneIcon|menu_h_o'} size={20} color={commonStyle.white}/>
            </TouchableOpacity>
          </View>
        </View>
        <Video
          ref={video => this.player = video}
          source={{uri: musicInfo.url}}
          volume={1.0}
          paused={this.state.paused}
          playInBackground={true}
          onLoadStart={this.loadStart}
          onLoad={data => this.setDuration(data)}
          onProgress={(data) => this.setTime(data)}
          onEnd={(data) => this.onEnd(data)}
          onError={(data) => this.videoError(data)}
          onBuffer={this.onBuffer}
          onTimedMetadata={this.onTimedMetadata}
        />
        <ShareModal
          visible={this.state.shareModalVisible}
          onVisibleChange={(modalVisible) => this.setState({
            shareModalVisible: modalVisible
          })}/>
      </View>
    )
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)})
  }

  render() {
    // let musicInfo = this.props.musicInfo || {}
    let musicInfo = mockList.list[this.state.currentIndex] || {}
    return (
      musicInfo.url ?
        <View style={styles.container}>
          <Image
            ref={(img) => { this.backgroundImage = img}}
            style={styles.bgContainer}
            source={{uri: musicInfo.cover}}
            resizeMode='cover'
            onLoadEnd={() => this.imageLoaded()}
          />
          <View style={styles.bgContainer}>
            {
              Platform.OS === 'ios' ?
                <VibrancyView
                  blurType={'light'}
                  blurAmount={20}
                  style={styles.container}/> :
                <BlurView
                  style={styles.absolute}
                  viewRef={this.state.viewRef}
                  blurType="light"
                  blurAmount={10}
                />
            }
          </View>
          {this.renderPlayer()}
        </View> : <View/>
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: deviceInfo.deviceHeight,
    width: deviceInfo.deviceWidth
  },
  navBarStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: deviceInfo.deviceWidth,
    height: deviceInfo.isIphoneX ? 88 : 64,
    borderWidth: 0.5,
    borderColor: commonStyle.lineColor
  },
  navBarContent: {
    marginTop: deviceInfo.isIphoneX ? 45 : 25 ,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  title: {
    color: commonStyle.white,
    fontSize: 14
  },
  subTitle: {
    color: commonStyle.white,
    fontSize: 11,
    marginTop: 5
  },
  djCard: {
    width: 270,
    height: 270,
    marginTop: 185,
    borderColor: commonStyle.gray,
    borderWidth: 10,
    borderRadius: 190,
    alignSelf: 'center',
    opacity: 0.2
  },
  playerStyle: {
    position: 'absolute',
    width: deviceInfo.deviceWidth,
  },
  progressStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    marginVertical: 30
  },
  cdStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})
/**
 * Created by guangqiang on 2017/9/9.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Slider, Animated, Easing} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'
import {commonStyle} from '../../../utils/commonStyle'
import Video from 'react-native-video'
import actions from '../../../actionCreators/music'
import {Actions} from 'react-native-router-flux'
import {MessageBarManager} from 'react-native-message-bar'
export default class MusicPlayer extends Component {

  constructor(props) {
    super(props)
    this.player = ''
    this.rotation = false
    this.state = {
      paused: false, // false: 表示播放，true: 表示暂停
      duration: 0.00,
      slideValue: 0.00,
      currentTime: 0.00,
      currentIndex: 0,
      playMode: 0,
      spinValue: new Animated.Value(0),
      playIcon: require('../../../assets/images/musicPlayer/播放.png'),
      playModeIcon: require('../../../assets/images/musicPlayer/列表循环.png')
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
    // 先获取到播放列表
    this.props.getMusicList(2017, 6, {}).then(response =>{
      console.log(response)
    })
    // 获取xiami音乐信息
    this.props.getxiamiMusic(this.props.music_id).then(response =>{
      console.log(response)
    })
  }

  setDuration(duration) {
    this.setState({duration: duration.duration})
    Actions.refresh({title: this.props.musicInfo.title, data: "Changed data"})
  }

  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime)
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime
    })
  }

  // 下一首
  nextSong(currentIndex) {
    this.reset()
    // 获取播放列表数组中数据
    currentIndex === this.props.musicList.length ? currentIndex = 0 : currentIndex
    let newSong = this.props.musicList[currentIndex]
    let music_id = newSong.music_id
    if (!isNaN(parseInt(music_id))) {
      this.props.getxiamiMusic(music_id)
      this.setState({currentIndex})
    } else {
      this.nextSong(currentIndex + 1)
      this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
    }
    this.play()
  }

  // 上一首
  pre(currentIndex) {
    this.reset()
    currentIndex === -1 ? currentIndex = this.props.musicList.length -1 : currentIndex
    let newSong = this.props.musicList[currentIndex]
    let music_id = newSong.music_id
    if (!isNaN(parseInt(music_id))) {
      this.props.getxiamiMusic(music_id)
      this.setState({currentIndex})
    } else {
      this.pre(currentIndex - 1)
      this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
    }
    this.play()
  }

  reset() {
    // 开始请求下一首歌曲，先将之前store中保存的歌曲信息删除
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
      playIcon: this.state.paused ? require('../../../assets/images/musicPlayer/播放.png') : require('../../../assets/images/musicPlayer/暂停.png')
    })
  }

  playMode(playMode) {
    playMode ++
    playMode = playMode === 3 ? playMode = 0 : playMode
    switch (playMode) {
      case 0:
        this.setState({playMode, playModeIcon: require('../../../assets/images/musicPlayer/列表循环.png')})
        break
      case 1:
        this.setState({playMode, playModeIcon: require('../../../assets/images/musicPlayer/单曲循环.png')})
        break
      case 2:
        this.setState({playMode, playModeIcon: require('../../../assets/images/musicPlayer/随机.png')})
        break
      default:
        break
    }
  }

  // 播放结束
  onEnd(data) {
    this.showMessageBar('亲！')('已帮你切换到下一首')('fuccess')
    // 开始下一首
    if (this.state.playMode === 0) {
      this.nextSong(this.state.currentIndex + 1)
    } else if (this.state.playMode === 1) {
      // 播放器从头开始播放
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

  render() {
    return (
      this.props.musicInfo.url ?
        <View style={styles.container}>
          <Image style={styles.bgImg} source={require('../../../assets/images/musicPlayer/胶片盘.png')} resizeMode='contain'/>
          <View style={styles.maskStyle}/>
          <View style={styles.playerStyle}>
            <Image style={{width: 220, height: 220, alignSelf: 'center'}} source={require('../../../assets/images/musicPlayer/胶片盘.png')}/>
            <Animated.Image
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                backgroundColor: 'orange',
                alignSelf: 'center',
                marginTop: -180,
                transform: [{rotate: this.state.spinValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })}]
              }}
              source={require('../../../assets/images/musicPlayer/播放.png')}
            />
            <View style={styles.progressStyle}>
              <Text>{actions.formatTime(Math.floor(this.state.currentTime))}</Text>
              <Slider
                style={styles.slider}
                value={this.state.slideValue}
                maximumValue={this.state.duration}
                onValueChange={value => {
                  this.setState({
                    currentTime: value
                  })
                }}
                onSlidingComplete={value => {
                  this.player.seek(value)
                }}
                step={1}
              />
              <Text>{actions.formatTime(Math.floor(this.state.duration))}</Text>
            </View>
            <View style={styles.toolBar}>
              <TouchableOpacity
                onPress={() => this.playMode(this.state.playMode)}
              >
                <Image style={{width: 30, height: 30}} source={this.state.playModeIcon}/>
              </TouchableOpacity>
              <View style={styles.cdStyle}>
                <TouchableOpacity
                  onPress={() => this.pre(this.state.currentIndex - 1)}
                >
                  <Image style={{width: 40, height: 40}} source={require('../../../assets/images/musicPlayer/上一首.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.play()}
                >
                  <Image style={{width: 40, height: 40}} source={this.state.playIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.nextSong(this.state.currentIndex + 1)}
                >
                  <Image style={{width: 40, height: 40}} source={require('../../../assets/images/musicPlayer/下一首.png')}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Image style={{width: 30, height: 30}} source={require('../../../assets/images/musicPlayer/单曲循环.png')}/>
              </TouchableOpacity>
            </View>
          </View>
          <Video
            ref={video => this.player = video}
            source={{uri: this.props.musicInfo.url}}
            volume={1.0}
            paused={this.state.paused}
            playInBackground={true}                     // Audio continues to play when app entering background.
            onLoadStart={this.loadStart}                // Callback when video starts to load
            onLoad={data => this.setDuration(data)}     // Callback when video loads
            onProgress={(data) => this.setTime(data)}   // Callback every ~250ms with currentTime
            onEnd={(data) => this.onEnd(data)}                    // Callback when playback finishes
            onError={(data) => this.videoError(data)}             // Callback when video cannot be loaded
            onBuffer={this.onBuffer}              // Callback when remote video is buffering
            onTimedMetadata={this.onTimedMetadata}      // Callback when the stream receive some metadata
          />
        </View> : <Text>加载中。。。</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImg: {
    backgroundColor: 'red',
    width: deviceInfo.deviceWidth,
    height: deviceInfo.deviceHeight
  },
  maskStyle: {
    backgroundColor: commonStyle.white,
    opacity: 0.2,
    width: deviceInfo.deviceWidth,
    height: deviceInfo.deviceHeight,
    position: 'absolute',
  },
  playerStyle: {
    position: 'absolute',
    width: deviceInfo.deviceWidth,
  },
  progressStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginTop: 60
  },
  slider: {
    backgroundColor: commonStyle.purple,
    flex: 1,
    marginHorizontal: 5
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: commonStyle.green,
    marginHorizontal: 10
  },
  cdStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonStyle.gray,
    justifyContent: 'space-around'
  }
})